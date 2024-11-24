import { HttpStatus } from '@/common/constants/http-status';
import { createGatewayHandler } from '@/lambda';
import { DBTestDTO } from '@/modules/db-test/dto/db-test.dto';
import { DB_TEST_ERROR_CODE } from '@/modules/db-test/exception/db-test-error-code';
import { DBTestException } from '@/modules/db-test/exception/db-test.exception';
import connectDB from '@/utils/dbClient';
import TestModel from '@/modules/test/models/test.model'; // Mongoose 모델

export const handler = createGatewayHandler<{
  message: string;
  savedUser: DBTestDTO;
}>(async (req, res) => {
  const { query } = req;

  if (!query?.name) throw new DBTestException(DB_TEST_ERROR_CODE.NAME_REQUIRED);
  if (!query?.age || isNaN(parseInt(query.age, 10))) throw new DBTestException(DB_TEST_ERROR_CODE.AGE_INVALID);

  await connectDB();

  const name = query.name as string;
  const age = Number(query.age);

  const newUser = new TestModel({ name, age });
  await newUser.save();

  // const users = await TestModel.find({}).exec();

  return res({
    status: HttpStatus.OK,
    body: {
      message: 'DB 테스트 성공',
      savedUser: new DBTestDTO({ name, age }),
    },
  });
});
