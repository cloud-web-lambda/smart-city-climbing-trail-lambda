import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
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

    if (!body.confirmationCode) {
      throw new Error('confirmationCode is required');
    }

    const { confirmationCode, sub } = body;

    const secretHash = getSecretHash(sub, env.CLIENT_ID, env.CLIENT_SECRET);

    const result = await confirm({
      Username: sub,
      ConfirmationCode: confirmationCode,
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
        message: error.message || '보안코드 인증 처리에 실패했습니다.',
        error: error,
      }),
    };
  }
};

// 사용자가 회원 가입을하면 해당 이메일로 Confirmation code가 발송됨
export async function confirm({
  Username,
  ConfirmationCode,
  SecretHash,
}: {
  Username: string;
  ConfirmationCode: string;
  SecretHash: string;
}): Promise<any> {
  const client = new CognitoIdentityProviderClient({ region: env.REGION }); // 리전 설정

  try {
    if (!ConfirmationCode) {
      throw new Error('확인 코드가 제공되지 않았습니다.');
    }

    const confirmResponse = await client.send(
      new ConfirmSignUpCommand({
        ClientId: env.CLIENT_ID,
        Username: Username,
        ConfirmationCode: ConfirmationCode,
        SecretHash: SecretHash,
      })
    );

    return {
      message: `${Username}님, 회원 가입과 인증이 성공적으로 완료되었습니다.`,
      confirmResponse,
    };
  } catch (error) {
    throw new Error(`회원 가입 또는 인증 중 오류가 발생했습니다. ${(error as Error).message || JSON.stringify(error)}`);
  }
}
