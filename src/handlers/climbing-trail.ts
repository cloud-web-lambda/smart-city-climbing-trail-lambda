export { handler } from '@/modules/recommend/climbing-trail.handler';

/**
 * @swagger
 * /climbing/trail:
 *   get:
 *     summary: 등산객 위치로부터 가장 가까운 등산로 정보 조회
 *     description: |
 *       [등산로 추천 페이지]
 *       - `등산객 위치`로부터 가장 가까운 `등산로 정보`를 제공합니다.
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
 *         schema:
 *           type: string
 *           example: 37.413294
 *         description: 위도
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: string
 *           example: 127.0277194
 *         description: 경도
 *       - in: query
 *         name: difficulty
 *         required: true
 *         schema:
 *           type: string
 *           enum: [easy, moderate, hard]
 *         description: 등산로 난이도 (easy, moderate, hard)
 *     responses:
 *       200:
 *         description: 성공적으로 등산객 위치로부터 가장 가까운 등산로 정보를 조회합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trailName:
 *                   type: string
 *                   description: 등산로 이름
 *                   example: "인왕산"
 *                 distance:
 *                   type: string
 *                   description: 등산로 거리
 *                   example: "470"
 *                 difficulty:
 *                   type: string
 *                   description: 등산로 난이도
 *                   example: "하"
 *                 coordinates:
 *                   type: array
 *                   description: 등산로 경로 좌표 배열
 *                   items:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: string
 *                         description: 위도
 *                       lng:
 *                         type: string
 *                         description: 경도
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
 *             examples:
 *               missing_parameters:
 *                 value:
 *                   status: 400
 *                   message: "필수 파라미터가 누락되었습니다."
 *               invalid_difficulty:
 *                 value:
 *                   status: 400
 *                   message: "difficulty 파라미터 값은 easy, moderate, hard 중 하나여야 합니다."
 *       404:
 *         description: 범위 내 가까운 등산로를 찾을 수 없습니다.
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
 *                   example: "해당 좌표와 일치하는 등산로를 찾을 수 없습니다."
 *       500:
 *         description: 서버 내부 오류
 */
