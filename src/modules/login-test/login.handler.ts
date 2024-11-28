import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import * as crypto from 'crypto';

const userPoolData = {
  UserPoolId: 'ap-northeast-2_Ul7NYddea',
  ClientId: '6l8va8f1jmgkni1hh5ij54o68m',
  Region: 'ap-northeast-2',
};

const clientSecret = '2nu888uqdpkd38sk0g7v7m1hh98bcpvg8k5vn1id81p94iv629u';

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

    const secretHash = getSecretHash(email, userPoolData.ClientId, clientSecret);

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
    console.error('Error:', error);
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
  const client = new CognitoIdentityProviderClient({ region: userPoolData.Region });

  try {
    // 로그인 인증 요청
    const authResponse = await client.send(
      new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH', // 비밀번호 기반 인증
        ClientId: userPoolData.ClientId,
        AuthParameters: {
          USERNAME: Username,
          PASSWORD: Password,
          SECRET_HASH: SecretHash,
        },
      })
    );

    console.log('Login success:', authResponse);

    // 로그인 성공 시 인증 토큰 정보 반환
    return {
      message: `${Username}이메일로, 로그인에 성공했습니다.`,
      idToken: authResponse.AuthenticationResult?.IdToken,
      accessToken: authResponse.AuthenticationResult?.AccessToken,
      refreshToken: authResponse.AuthenticationResult?.RefreshToken,
    };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(`로그인 중 오류가 발생했습니다. ${error.message || JSON.stringify(error)}`);
  }
}
