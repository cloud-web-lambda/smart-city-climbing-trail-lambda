export { handler } from '@/modules/login/login.handler';

/**
 * @swagger
 * /sign-in:
 *   post:
 *     summary: Sign in to the application
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
 *                 description: User's email address
 *                 example: "pyeonk33@gmail.com"
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "Abcde12345**"
 *     responses:
 *       200:
 *         description: Successful login
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
 *         description: Invalid Credentials or Missing Parameters
 *       500:
 *         description: Internal server error
 */
