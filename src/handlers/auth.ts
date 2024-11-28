export { handler } from '@/modules/login-test/auth.handler';

/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Sign up to the application
 *     description: Sign up the user with their email and password
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

