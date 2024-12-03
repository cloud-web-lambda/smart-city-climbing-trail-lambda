import { CognitoIdentityProviderClient, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { mapCognitoError } from './dto/cognito-error.dto';
import env from '@/config';
import { LoginException } from './exception/login.exception';
import { ERROR_CODE } from './exception/error-code';


export const handler = async (event) => {
  try {
    const authorizationHeader = event.headers?.Authorization || event.headers?.authorization;

    if (!authorizationHeader) {
        throw new LoginException(ERROR_CODE.MISSING_ACCESS_TOKEN);
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
        throw new LoginException(ERROR_CODE.MISSING_ACCESS_TOKEN);
    }

    const result = await validateAccessToken(accessToken);

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

export async function validateAccessToken(accessToken: string): Promise<{
  username: string;
  email: string;
  isValid: boolean;
}> {
  const client = new CognitoIdentityProviderClient({ region: env.REGION });

  const command = new GetUserCommand({
    AccessToken: accessToken,
  });

  try {
    const response = await client.send(command);

    const emailAttribute = response.UserAttributes?.find((attr) => attr.Name === 'email');

    return {
      username: response.Username || '',
      email: emailAttribute?.Value || '',
      isValid: true,
    };
  } catch (error) {
    if (error instanceof LoginException) {
        throw error;
      }
  
    mapCognitoError(error);
    throw error;
  }
}
