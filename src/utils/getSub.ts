import { CognitoIdentityProviderClient, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { mapCognitoError } from '@/modules/login/service/cognito-error.service';
import { LoginException } from '@/modules/login/exception/login.exception';
import env from '@/config';

export async function getSubFromAccessToken(accessToken: string): Promise<string> {
    const client = new CognitoIdentityProviderClient({ region: env.REGION });
  
    const command = new GetUserCommand({
      AccessToken: accessToken,
    });
  
    try {
      const response = await client.send(command);
      const userAttributes = response.UserAttributes || [];
  
      const sub = userAttributes.find((attr) => attr.Name === 'sub')?.Value || '';
      return sub;
    } catch (error) {
      if (error instanceof LoginException) {
        throw error;
      }
  
      mapCognitoError(error);
      throw error;
    }
  }