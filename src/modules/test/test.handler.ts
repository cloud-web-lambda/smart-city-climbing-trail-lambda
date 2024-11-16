import { HttpStatus } from '@/common/constants/http-status';
import { createGatewayHandler } from '@/lambda';
import { TestDTO } from '@/modules/test/dto/test.dto';
import { TEST_ERROR_CODE } from '@/modules/test/exception/error-code';
import { TestException } from '@/modules/test/exception/test.exception';

export const handler = createGatewayHandler<TestDTO>(async (req, res) => {
  const { query, params } = req;

  if (!query || !('name' in query)) throw new TestException(TEST_ERROR_CODE.NAME_REQUIRED);
  if (isNaN(parseInt(params?.age || '', 10))) throw new TestException(TEST_ERROR_CODE.AGE_HAS_TO_BE_NUMBER);

  const age = Number(params?.age);
  const name = query.name as string;

  return res({
    status: HttpStatus.OK,
    body: new TestDTO({ name, age }),
  });
});
