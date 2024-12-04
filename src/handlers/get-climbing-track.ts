export { handler } from '@/modules/record/get-climbing-track.handler';

/**
 * @swagger
 * /climbing/track:
 *   get:
 *     summary: 등산객의 전체 등산기록 조회
 *     description: |
 *       [등산기록 조회 페이지]
 *       - 전체 사용자의 `등산기록`을 조회합니다.
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
 *     responses:
 *       200:
 *         description: 성공적으로 등산객의 전체 등산 기록을 조회합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalHikingTime:
 *                   type: number
 *                   description: 총 등산 시간
 *                   example: 21802
 *                 totalDistance:
 *                   type: number
 *                   description: 총 등산 거리
 *                   example: 60
 *                 totalCalories:
 *                   type: number
 *                   description: 총 소모된 칼로리
 *                   example: 1035
 *                 averageHikingTime:
 *                   type: number
 *                   description: 평균 등산 시간
 *                   example: 7267.333333333333
 *                 averageDistance:
 *                   type: number
 *                   description: 평균 등산 거리
 *                   example: 20
 *                 averageCalories:
 *                   type: number
 *                   description: 평균 소모된 칼로리
 *                   example: 345
 *                 trails:
 *                   type: array
 *                   description: 등산로 이름
 *                   items:
 *                     type: string
 *                     example: "백두산"
 *                   example: ["백두산", "북한산"]  # 배열 형태로 예시 제공
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
 *       404:
 *         description: 사용자의 등산기록이 존재하지 않습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP 상태 코드
 *                   example: 404
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *                   example: "사용자의 등산기록이 존재하지 않습니다."
 *       500:
 *         description: 서버 내부 오류
 */
