export { handler } from '@/modules/login/auth.handler';

/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: 회원가입
 *     description: |
 *       [회원가입 페이지]
 *       - 이메일은 Gmail이어야 합니다.
 *       - 비밀번호는 다음 조건을 만족해야 합니다:
 *         - 최소 8자 이상
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
 *                 description: 사용자 이메일
 *                 example: "pyeonk33@gmail.com"
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *                 example: "Abcde12345**"
 *     responses:
 *       200:
 *         description: 회원가입이 성공적으로 완료되었습니다.
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
 *         description: 잘못된 요청 - 요청이 잘못되었습니다.
 *       500:
 *         description: 서버 내부 오류
 */
