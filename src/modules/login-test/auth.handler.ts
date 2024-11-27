import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import * as crypto from 'crypto';

const userPoolData = {
  UserPoolId: 'ap-northeast-2_Ul7NYddea',
  ClientId: '6l8va8f1jmgkni1hh5ij54o68m',
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
      throw new Error('Username is required');
    }

    const { email, password } = body;
    const clientId = userPoolData.ClientId;
    const secretHash = getSecretHash(email, clientId, clientSecret);

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
    console.error('Error:', error);
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
  const client = new CognitoIdentityProviderClient({ region: 'ap-northeast-2' }); // 적절한 리전으로 변경

  const command = new SignUpCommand({
    ClientId: userPoolData.ClientId,
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
    console.error('Signup error:', error);
    throw error;
  }
}
