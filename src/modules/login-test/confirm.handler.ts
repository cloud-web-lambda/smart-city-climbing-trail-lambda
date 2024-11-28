import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
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

    if (!body.confirmationCode) {
      throw new Error('confirmationCode is required');
    }

    const { confirmationCode, sub } = body;

    const secretHash = getSecretHash(sub, userPoolData.ClientId, clientSecret);

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
    console.error('Error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message || '보안코드 인증 처리에 실패했습니다.',
        error: error,
      }),
    };
  }
};

/*
 * 사용자가 회원 가입을하면 해당 이메일로 Confirmation code가 발송됨
 * */
export async function confirm({
  Username,
  ConfirmationCode,
  SecretHash,
}: {
  Username: string;
  ConfirmationCode: string;
  SecretHash: string;
}): Promise<any> {
  const client = new CognitoIdentityProviderClient({ region: 'ap-northeast-2' }); // 리전 설정

  try {
    // 확인 코드 검증 로직
    if (!ConfirmationCode) {
      throw new Error('확인 코드가 제공되지 않았습니다.');
    }

    const confirmResponse = await client.send(
      new ConfirmSignUpCommand({
        ClientId: userPoolData.ClientId,
        Username: Username,
        ConfirmationCode: ConfirmationCode,
        SecretHash: SecretHash,
      })
    );

    console.log('Confirm response:', confirmResponse);

    return {
      message: `${Username}님, 회원 가입과 인증이 성공적으로 완료되었습니다.`,
      confirmResponse,
    };
  } catch (error) {
    console.error('Signup or confirmation error:', error);
    throw new Error(`회원 가입 또는 인증 중 오류가 발생했습니다. ${(error as Error).message || JSON.stringify(error)}`);
  }
}
