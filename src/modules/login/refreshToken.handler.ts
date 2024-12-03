import { CognitoIdentityProviderClient, InitiateAuthCommand, AuthFlowType } from '@aws-sdk/client-cognito-identity-provider';
import { mapCognitoError, CognitoErrorDTO, CognitoErrorType } from './dto/cognito-error.dto'
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

    if (!body.refreshToken || !body.email) {
      throw new Error('Refresh token and email are required');
    }

    const { email, refreshToken } = body;
    const clientId = env.CLIENT_ID;
    const secretHash = getSecretHash(email, clientId, env.CLIENT_SECRET);

    const result = await refreshTokens({
      Email: email,
      RefreshToken: refreshToken,
      secretHash: secretHash,
    });

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

export async function refreshTokens({
  Email,
  RefreshToken,
  secretHash,
}: {
  Email: string;
  RefreshToken: string;
  secretHash: string;
}): Promise<{ 
  accessToken: string; 
  idToken: string; 
  refreshToken: string 
}> {
  const client = new CognitoIdentityProviderClient({ region: env.REGION });

  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
    ClientId: env.CLIENT_ID,
    AuthParameters: {
      REFRESH_TOKEN: RefreshToken,
      SECRET_HASH: secretHash,
      USERNAME: Email,
    },
  });

  try {
    const response = await client.send(command);
    
    return {
      accessToken: response.AuthenticationResult?.AccessToken || '',
      idToken: response.AuthenticationResult?.IdToken || '',
      refreshToken: response.AuthenticationResult?.RefreshToken || RefreshToken,
    };
  } catch (error) {
    throw error;
  }
}