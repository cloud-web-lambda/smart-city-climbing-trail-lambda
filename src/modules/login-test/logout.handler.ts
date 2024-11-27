import { CognitoIdentityProviderClient, GlobalSignOutCommand } from '@aws-sdk/client-cognito-identity-provider';

export const handler = async (event) => {
  const client = new CognitoIdentityProviderClient({ region: 'ap-northeast-2' });

  try {
    // Authorization 헤더에서 Access Token 추출
    const authorizationHeader = event.headers?.Authorization || event.headers?.authorization;

    if (!authorizationHeader) {
      throw new Error('Authorization header is missing.');
    }

    //Bearer <token> 형식에서 토큰만 추출
    const accessToken = authorizationHeader.startsWith('Bearer ') ? authorizationHeader.slice(7) : authorizationHeader;

    if (!accessToken) {
      throw new Error('Access token is missing in the Authorization header.');
    }

    // GlobalSignOutCommand를 사용하여 모든 세션 로그아웃 처리
    const command = new GlobalSignOutCommand({ AccessToken: accessToken });
    const response = await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully logged out from all sessions.' }),
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
