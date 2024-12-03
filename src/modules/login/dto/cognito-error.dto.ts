import { LoginException } from '.././exception/login.exception';
import { ERROR_CODE } from '.././exception/error-code';


export function mapCognitoError(error: any){
  switch (error.name) {
    case 'NotAuthorizedException':
      throw new LoginException(ERROR_CODE.INVALID_TOKEN)
    case 'ExpiredTokenException':
      throw new LoginException(ERROR_CODE.EXPIRED_TOKEN)
    case 'UserNotFoundException':
        throw new LoginException(ERROR_CODE.USER_NOT_FOUND)
    case 'ResourceNotFoundException':
        throw new LoginException(ERROR_CODE.RESOURCE_NOT_FOUND)
    default:
        throw new LoginException(ERROR_CODE.UNKNOWN_ERROR)
  }
}
