export enum CognitoErrorType {
    INVALID_TOKEN = 'INVALID_TOKEN',
    EXPIRED_TOKEN = 'EXPIRED_TOKEN',
    REFRESH_FAILED = 'REFRESH_FAILED',
    SIGNUP_FAILED = 'SIGNUP_FAILED',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
  }
  
  export interface CognitoErrorDTO {
    type: CognitoErrorType;
    message: string;
    details?: string;
  }
  
  export function mapCognitoError(error: any): CognitoErrorDTO {
    switch (error.name) {
      case 'NotAuthorizedException':
        return {
          type: CognitoErrorType.INVALID_TOKEN,
          message: '인증되지 않은 토큰입니다.',
          details: error.message
        };
      case 'ExpiredTokenException':
        return {
          type: CognitoErrorType.EXPIRED_TOKEN,
          message: '토큰이 만료되었습니다.',
          details: error.message
        };
      case 'UserNotFoundException':
        return {
          type: CognitoErrorType.INVALID_TOKEN,
          message: '사용자를 찾을 수 없습니다.',
          details: error.message
        };
      default:
        return {
          type: CognitoErrorType.UNKNOWN_ERROR,
          message: '알 수 없는 오류가 발생했습니다.',
          details: error.message
        };
    }
  }