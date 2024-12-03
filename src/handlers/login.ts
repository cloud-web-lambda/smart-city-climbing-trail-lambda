export { handler } from '@/modules/login/login.handler';

/**
 * @swagger
 * /sign-in:
 *   post:
 *     summary: 로그인
 *     description: |
 *       [로그인 페이지]
 *       - 회원가입한 이메일과 비밀번호로 로그인합니다.
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
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "pyeonk33@gmail.com 이메일로, 로그인에 성공했습니다."
 *                 idToken:
 *                   type: string
 *                   example: "eyJraWQiOiJSNkZOSWhldmZ3QUdCYzAwNjlqeEtLUDZRT05aZFNcL3A2VE13aVE4dG5OYz0iLCJhbGciOiJSUzI1NiJ9..."
 *                 accessToken:
 *                   type: string
 *                   example: "eyJraWQiOiJoQzJzRUtzb0VyengxVlk5T1JcL3U4ZnZnYjZnSEJkcFc4MjVhNzNcLyt2V2M9IiwiYWxnIjoiUlMyNTYifQ..."
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.XMJEOlLJJe64rUJavmyZoAlkf..."
 *       400:
 *         description: 잘못된 자격 증명 또는 누락된 매개변수
 *       500:
 *         description: 서버 내부 오류
 */
