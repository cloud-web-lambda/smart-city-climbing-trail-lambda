export { handler } from '@/modules/record/update-climbing-track.handler';

/**
 * @swagger
 * /climbing/track:
 *   post:
 *     summary: 등산객의 등산기록을 저장
 *     description: |
 *       [등산기록 저장 페이지]
 *       - 등산객의 `등산기록`을 저장합니다.
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
 *               trailName:
 *                 type: string
 *                 description: 등산로 이름
 *                 example: "북한산"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: 등산 시작 시간
 *                 example: "2024-11-13T00:00:00"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: 등산 종료 시간
 *                 example: "2024-11-13T00:00:30"
 *               distance:
 *                 type: number
 *                 description: 등산 거리
 *                 example: 20
 *               calories:
 *                 type: number
 *                 description: 소모된 칼로리
 *                 example: 345
 *     responses:
 *       200:
 *         description: 성공적으로 등산기록을 저장합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sub:
 *                   type: string
 *                   description: 사용자 ID
 *                   example: "abcdefgh"
 *                 trailName:
 *                   type: string
 *                   description: 등산로 이름
 *                   example: "백두산"
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   description: 등산 시작 시간
 *                   example: "2024-11-13T00:00:00.000Z"
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   description: 등산 종료 시간
 *                   example: "2024-11-13T00:00:30.000Z"
 *                 distance:
 *                   type: number
 *                   description: 등산 거리
 *                   example: 20
 *                 calories:
 *                   type: number
 *                   description: 소모된 칼로리
 *                   example: 345
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
 *                   example: "year, month의 형식이 올바르지 않습니다."
 *       500:
 *         description: 서버 내부 오류
 */
