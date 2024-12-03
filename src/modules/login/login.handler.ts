import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
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

    const secretHash = getSecretHash(email, env.CLIENT_ID, env.CLIENT_SECRET);

    const result = await login({
      Username: email,
      Password: password,
      SecretHash: secretHash,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    if (error instanceof LoginException) {
      throw error;
    }

    mapCognitoError(error);
    throw error;
  }
};

export async function login({
  Username,
  Password,
  SecretHash,
}: {
  Username: string;
  Password: string;
  SecretHash: string;
}): Promise<any> {
  const client = new CognitoIdentityProviderClient({ region: env.REGION });

  try {
    const authResponse = await client.send(
      new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: env.CLIENT_ID,
        AuthParameters: {
          USERNAME: Username,
          PASSWORD: Password,
          SECRET_HASH: SecretHash,
        },
      })
    );

    return {
      message: `${Username}이메일로, 로그인에 성공했습니다.`,
      idToken: authResponse.AuthenticationResult?.IdToken,
      accessToken: authResponse.AuthenticationResult?.AccessToken,
      refreshToken: authResponse.AuthenticationResult?.RefreshToken,
    };
  } catch (error) {
    if (error instanceof LoginException) {
      throw error;
    }

    mapCognitoError(error);
    throw error;
  }
}
