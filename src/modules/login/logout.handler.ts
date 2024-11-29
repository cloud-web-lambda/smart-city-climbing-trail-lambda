import {
  CognitoIdentityProviderClient,
  GlobalSignOutCommand,
  RevokeTokenCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import env from '@/config';

export const handler = async (event) => {
  const client = new CognitoIdentityProviderClient({ region: env.REGION });

  try {
    const authorizationHeader = event.headers?.Authorization || event.headers?.authorization;

    if (!authorizationHeader) {
      throw new Error('Authorization 헤더가 비어있습니다.');
    }

    const accessToken = authorizationHeader.startsWith('Bearer ') ? authorizationHeader.slice(7) : authorizationHeader;

    if (!accessToken) {
      throw new Error('액세스 토큰이 누락되었습니다.');
    }

    // GlobalSignOutCommand를 사용하여 모든 세션 로그아웃 처리
    const command = new GlobalSignOutCommand({ AccessToken: accessToken });

    // const command = new RevokeTokenCommand({
    //   Token: accessToken,
    //   ClientId: env.CLIENT_ID
    // });

    const response = await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: '모든 세션에 대해 성공적으로 로그아웃 처리되었습니다.' }),
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Logout failed.',
        error: error.message || error,
      }),
    };
  }
};
