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
 *       - bearerAuth: []
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
 *         description: 잘못된 요청 - 요청이 잘못되었습니다.
 *       500:
 *         description: 서버 내부 오류
 */
