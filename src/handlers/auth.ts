export { handler } from '@/modules/login-test/auth.handler';

/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: 회원가입
 *     description: 사용자 이메일과 비밀번호를 사용하여 회원가입을 처리합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자의 이메일 주소
 *                 example: "pyeonk33@gmail.com"
 *               password:
 *                 type: string
 *                 description: 사용자의 비밀번호
 *                 example: "Abcde12345**"
 *     responses:
 *       200:
 *         description: 성공적인 회원가입 응답
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "pyeonk33@gmail.com 이메일로 회원 가입이 성공적으로 완료되었습니다."
 *                 sub:
 *                   type: string
 *                   description: 사용자 고유 아이디
 *                   example: "74d87d9c-20a1-7039-6a3d-070c869a779e"
 *       400:
 *         description: 잘못된 요청 (예: 이메일 또는 비밀번호 형식 오류)
 *       500:
 *         description: 서버 오류
 */
