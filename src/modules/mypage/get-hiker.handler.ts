import { HttpStatus } from '@/common/constants/http-status';
import { createGatewayHandler } from '@/lambda';
import { hikerDTO } from './dto/hikerInfo.dto';
import { HikerException } from './exception/hiker.exception';
import { ERROR_CODE } from './exception/error-code';
import connectDB from '@/utils/dbClient';
import HikerInfo from './dto/hikerInfo';
import { LoginException } from '../login/exception/login.exception';
import { getSubFromAccessToken } from '@/utils/getSub';

// 몸무게 조회 기능
export const handler = createGatewayHandler<hikerDTO>(async (req, res) => {
  const authorizationHeader = req.headers?.Authorization || req.headers?.authorization;

  if (!authorizationHeader) {
    throw new LoginException(ERROR_CODE.MISSING_ACCESS_TOKEN);
  }

  const accessToken = authorizationHeader.split(' ')[1];

  if (!accessToken) {
    throw new LoginException(ERROR_CODE.MISSING_ACCESS_TOKEN);
  }

  const sub = await getSubFromAccessToken(accessToken);

  if (!sub) throw new HikerException(ERROR_CODE.MISSING_REQUIRED_PARAM);

  await connectDB();

  // 기존에 해당 sub로 사용자가 있는지 확인
  const user = await HikerInfo.findOne({ sub });

  if (!user) {
    const hikerNullData = new hikerDTO({
      sub: null,
      weight: null,
    });

    return res({
      status: HttpStatus.OK,
      body: hikerNullData,
    });
  }

  // 응답을 위한 DTO 객체 생성
  const hikerData = new hikerDTO({
    sub: user.sub,
    weight: user.weight,
  });

  //await HikerInfo.deleteOne({ sub }); // 데이터 삭제

  // 성공적으로 데이터를 반환
  return res({
    status: HttpStatus.OK,
    body: hikerData,
  });
});
