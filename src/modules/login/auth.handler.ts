import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import * as crypto from 'crypto';
import env from '@/config';
import { LoginException } from './exception/login.exception';
import { ERROR_CODE } from './exception/error-code';
import { mapCognitoError } from './service/cognito-error.service';

function getSecretHash(username: string, clientId: string, clientSecret: string) {
  const hmac = crypto.createHmac('sha256', clientSecret);
  hmac.update(username + clientId);
  return hmac.digest('base64');
}

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');

    if (!body.email || !body.password) {
      throw new LoginException(ERROR_CODE.MISSING_EMAIL_OR_PASSWORD);
    }

    const { email, password } = body;
    const clientId = env.CLIENT_ID;
    const secretHash = getSecretHash(email, clientId, env.CLIENT_SECRET);

    const result = await signUp({
      Username: email,
      Password: password,
      Email: email,
      secretHash: secretHash,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    if (error instanceof LoginException) {
      return {
        statusCode: error.status,
        body: JSON.stringify(error),
      };
    }

    mapCognitoError(error);
    return {
      statusCode: error.status,
      body: JSON.stringify(error),
    };
  }
};

export async function signUp({
  Username,
  Password,
  Email,
  secretHash,
}: {
  Username: string;
  Password: string;
  Email: string;
  secretHash: string;
}): Promise<{ message: string; sub: string }> {
  const client = new CognitoIdentityProviderClient({ region: env.REGION }); // 적절한 리전으로 변경

  const command = new SignUpCommand({
    ClientId: env.CLIENT_ID,
    Username: Username,
    Password: Password,
    SecretHash: secretHash,
    UserAttributes: [
      {
        Name: 'email',
        Value: Email,
      },
    ],
  });

  try {
    const response = await client.send(command);
    const sub = response.UserSub;
    return {
      message: `${Username}이메일로 회원 가입이 성공적으로 완료되었습니다.`,
      sub: `${sub}`,
    };
  } catch (error) {
    if (error instanceof LoginException) {
      throw error;
    }

    mapCognitoError(error);
    throw error;
  }
}
