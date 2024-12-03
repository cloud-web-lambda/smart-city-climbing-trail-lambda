import {
  CognitoIdentityProviderClient,
  GlobalSignOutCommand,
  RevokeTokenCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import env from '@/config';
import { LoginException } from './exception/login.exception';
import { ERROR_CODE } from './exception/error-code';
import { mapCognitoError } from './dto/cognito-error.dto';


export const handler = async (event) => {
  const client = new CognitoIdentityProviderClient({ region: env.REGION });

  try {
    const authorizationHeader = event.headers?.Authorization || event.headers?.authorization;

    if (!authorizationHeader) {
      throw new LoginException(ERROR_CODE.MISSING_ACCESS_TOKEN)
    }

    const accessToken = authorizationHeader.startsWith('Bearer ') ? authorizationHeader.slice(7) : authorizationHeader;

    if (!accessToken) {
      throw new LoginException(ERROR_CODE.MISSING_ACCESS_TOKEN)
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
    if (error instanceof LoginException) {
      throw error;
    }

    mapCognitoError(error);
    throw error;
  }
};
