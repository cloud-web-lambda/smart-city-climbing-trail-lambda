export { handler } from '@/modules/mypage/update-hiker.handler';

/**
 * @swagger
 * /hikers:
 *   post:
 *     summary: 등산객의 신체정보(몸무게) 저장
 *     description: |
 *       [마이 페이지]
 *       - 등산객의 `신체정보(몸무게)`를 저장합니다.
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: 인증을 위한 Bearer 액세스 토큰
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer eyJraWQiOiJoQzJzRUtzb0VyengxVlk5T1JcL3U4ZnZnYjZnSEJkcFc4MjVhNzNcLyt2V2M9IiwiYWxnIjoiUlMyNTYifQ..."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weight:
 *                 type: string
 *                 description: 등산객의 몸무게 정보
 *                 example: 68
 *     responses:
 *       200:
 *         description: 성공적으로 등산객의 몸무게 정보를 업데이트합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sub:
 *                   type: string
 *                   description: 사용자 ID
 *                   example: abcdefghijk
 *                 weight:
 *                   type: integer
 *                   description: 사용자 신체정보(몸무게)
 *                   example: 68
 *       400:
 *         description: 잘못된 요청 또는 필수 파라미터 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP 상태 코드
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *                   example: "필수 파라미터가 누락되었습니다."
 *       500:
 *         description: 서버 내부 오류
 */
