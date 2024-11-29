export { handler } from '@/modules/recommend/alternative-trail.handler';

/**
 * @swagger
 * /climbing/trail/alternative:
 *   get:
 *     summary: 같은 산의 다른 등산로 추천
 *     description: 사용자의 위치와 원하는 난이도에 따라 같은 산의 다른 등산로를 추천합니다.
 *     parameters:
 *       - name: lat
 *         in: query
 *         description: 사용자의 현재 위치의 위도
 *         required: true
 *         schema:
 *           type: string
 *           example: "37.5665"
 *       - name: lng
 *         in: query
 *         description: 사용자의 현재 위치의 경도
 *         required: true
 *         schema:
 *           type: string
 *           example: "126.9780"
 *       - name: difficulty
 *         in: query
 *         description: 등산로의 난이도 (easy, medium, hard 중 하나)
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - easy
 *             - medium
 *             - hard
 *           example: "easy"
 *       - name: count
 *         in: query
 *         description: 추천받고자 하는 등산로의 순서 (1부터 시작하는 자연수)
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: 성공적으로 다른 등산로를 추천함
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trailName:
 *                   type: string
 *                   description: 산의 이름
 *                   example: "북한산"
 *                 distance:
 *                   type: number
 *                   description: 등산로의 길이 (미터 단위)
 *                   example: 3500
 *                 difficulty:
 *                   type: string
 *                   description: 등산로의 난이도
 *                   example: "easy"
 *                 coordinates:
 *                   type: array
 *                   description: 등산로의 좌표 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         example: 37.6584
 *                       lng:
 *                         type: number
 *                         example: 126.9779
 *       400:
 *         description: 잘못된 파라미터 또는 파라미터 누락
 *       404:
 *         description: 해당 조건에 맞는 등산로를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
