export { handler } from '@/modules/recommend/find-subways-nearby.handler';

/**
 * @swagger
 * /subways/nearby:
 *   get:
 *     summary: 등산객 위치로부터 가까운 지하철 역 정보 조회
 *     description: |
 *       [가까운 지하철 정보 제공 페이지]
 *       - 하산할 때, 등산객 위치로부터 `가까운 지하철 역 정보`를 제공합니다.
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
 *       - in: query
 *         name: lat
 *         required: true
 *         description: 위도
 *         schema:
 *           type: string
 *           example: 37.413294
 *       - in: query
 *         name: lng
 *         required: true
 *         description: 경도
 *         schema:
 *           type: string
 *           example: 127.0277194
 *     responses:
 *       200:
 *         description: 성공적으로 등산객 위치로부터 가까운 지하철 역 정보를 조회합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stationName:
 *                   type: string
 *                   description: 가까운 지하철 역 이름
 *                   example: "시청"
 *                 stationLine:
 *                   type: string
 *                   description: 가까운 지하철 역 호선
 *                   example: 1
 *                 lat:
 *                   type: number
 *                   format: float
 *                   description: 가까운 지하철 역 위도
 *                   example: 37.56359
 *                 lng:
 *                   type: number
 *                   format: float
 *                   description: 가까운 지하철 역 경도
 *                   example: 126.975407
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
 *         description: 범위 내 가까운 지하철역을 찾을 수 없습니다.
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
 *                   example: "가장 가까운 지하철 역 정보가 없습니다."
 *       500:
 *         description: 서버 내부 오류
 */
