export { handler } from '@/modules/login/logout.handler';

/**
 * @swagger
 * /sign-out:
 *   post:
 *     summary: 애플리케이션에서 로그아웃
 *     description: |
 *       [로그인 페이지]
 *       - 사용자의 액세스 토큰으로 현재 세션에 대해 종료합니다.
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: 인증을 위한 Bearer 액세스 토큰
 *         required: true
 *         type: string
 *         example: "eyJraWQiOiJoQzJzRUtzb0VyengxVlk5T1JcL3U4ZnZnYjZnSEJkcFc4MjVhNzNcLyt2V2M9IiwiYWxnIjoiUlMyNTYifQ..."
 *     responses:
 *       200:
 *         description: 모든 세션에서 성공적으로 로그아웃됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "모든 세션에서 성공적으로 로그아웃되었습니다."
 *       400:
 *         description: 잘못된 액세스 토큰
 *       500:
 *         description: 서버 내부 오류
 * x-notes:
 *   - "액세스 토큰을 얻으려면 '/sign-in' 엔드포인트를 통해 로그인해야 합니다."
 *   - "이메일과 비밀번호를 사용하여 액세스 토큰을 받습니다."
 *   - "'/sign-in' 엔드포인트에 대한 예시 요청: {\"email\": \"your-email@example.com\", \"password\": \"yourPassword123\"}"
 *   - "로그인 후 응답에서 액세스 토큰을 받게 되며, 이를 'Authorization' 헤더에 사용하여 이 엔드포인트를 호출합니다."
 */

