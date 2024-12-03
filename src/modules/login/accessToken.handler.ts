import { CognitoIdentityProviderClient, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { mapCognitoError, CognitoErrorDTO, CognitoErrorType } from './dto/cognito-error.dto'
import env from '@/config';

export const handler = async (event) => {
  try {
    const { accessToken } = JSON.parse(event.body || '{}');

    if (!accessToken) {
      throw new Error('Access token is required');
    }

    const result = await validateAccessToken(accessToken);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    const errorDto: CognitoErrorDTO = mapCognitoError(error);
    
    return {
      statusCode: errorDto.type === CognitoErrorType.EXPIRED_TOKEN 
        || errorDto.type === CognitoErrorType.INVALID_TOKEN 
        ? 401 
        : 400,
      body: JSON.stringify(errorDto),
    };
  }
};

export async function validateAccessToken(accessToken: string): Promise<{ 
  username: string; 
  email: string; 
  isValid: boolean 
}> {
  const client = new CognitoIdentityProviderClient({ region: env.REGION });

  const command = new GetUserCommand({
    AccessToken: accessToken,
  });

  try {
    const response = await client.send(command);
    
    const emailAttribute = response.UserAttributes?.find(attr => attr.Name === 'email');

    return {
      username: response.Username || '',
      email: emailAttribute?.Value || '',
      isValid: true,
    };
  } catch (error) {
    throw error;
  }
}