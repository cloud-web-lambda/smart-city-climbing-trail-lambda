import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
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
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message || '로그인에 실패했습니다.',
        error: error,
      }),
    };
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
    throw new Error(`로그인 중 오류가 발생했습니다. ${error.message || JSON.stringify(error)}`);
  }
}
