import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  AuthFlowType,
  GetUserCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { LoginException } from './exception/login.exception';
import { ERROR_CODE } from './exception/error-code';
import { mapCognitoError } from './dto/cognito-error.dto';
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
      throw new LoginException(ERROR_CODE.MISSING_REFRESH_TOKEN_OR_EMAIL);
    }

    const authorizationHeader = event.headers?.Authorization || event.headers?.authorization;

    if (!authorizationHeader) {
      throw new LoginException(ERROR_CODE.MISSING_ACCESS_TOKEN);
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      throw new LoginException(ERROR_CODE.MISSING_ACCESS_TOKEN);
    }

    const sub = await getSubFromAccessToken(accessToken);
    const { email, refreshToken } = body;
    const secretHash = getSecretHash(sub, env.CLIENT_ID, env.CLIENT_SECRET);

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
    if(error.name)
    await mapCognitoError(error);
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
  refreshToken: string;
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
    if (error instanceof LoginException) {
      throw error;
    }

    mapCognitoError(error);
    throw error;
  }
}

async function getSubFromAccessToken(accessToken: string): Promise<string> {
  const client = new CognitoIdentityProviderClient({ region: env.REGION });

  const command = new GetUserCommand({
    AccessToken: accessToken
  });

  try {
    const response = await client.send(command);
    const userAttributes = response.UserAttributes || [];
    
    const sub = userAttributes.find(attr => attr.Name === 'sub')?.Value || '';
    return sub;
  } catch (error) {
    if (error instanceof LoginException) {
      throw error;
    }

    mapCognitoError(error);
    throw error;
  }
}