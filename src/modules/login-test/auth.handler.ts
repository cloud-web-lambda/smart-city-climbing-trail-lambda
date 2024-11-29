import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import * as crypto from 'crypto';
import env from '@/config';

function getSecretHash(username: string, clientId: string, clientSecret: string) {
  const hmac = crypto.createHmac('sha256', clientSecret);
  hmac.update(username + clientId);
  return hmac.digest('base64');
}

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');

    if (!body.email) {
      throw new Error('Email is required');
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
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message || '회원가입 처리에 실패했습니다.',
        error: error,
      }),
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
    throw error;
  }
}
