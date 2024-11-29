export { handler } from '@/modules/login/auth.handler';

/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Sign up to the application
 *     description: |
 *       [회원가입 페이지]
 *       - 이메일은 Gmail이어야 합니다.
 *       - 비밀번호는 다음 조건을 만족해야 합니다.
 *         - 암호 최소 길이는 8자 이상
 *         - 대문자 영어 1개 이상 포함
 *         - 소문자 영어 1개 이상 포함
 *         - 숫자 1개 이상 포함
 *         - 특수 문자 1개 이상 포함
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: email
 *                 example: "pyeonk33@gmail.com"
 *               password:
 *                 type: string
 *                 description: password
 *                 example: "Abcde12345**"
 *     responses:
 *       200:
 *         description: Successful response
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
 *                   example: "74d87d9c-20a1-7039-6a3d-070c869a779e"
 *       400:
 *         description: Missing Parameter
 *       500:
 *         description: Internal server error
 */
