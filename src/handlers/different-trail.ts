export { handler } from '@/modules/recommend/different-trail.handler';

/**
 * @swagger
 * /climbing/trail/different:
 *   get:
 *     summary: 다른 산의 등산로 추천
 *     description: 사용자의 위치와 원하는 난이도에 따라 제외할 산들을 제외하고 다른 산의 등산로를 추천합니다.
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
 *           example: "medium"
 *       - name: excludedMountains
 *         in: query
 *         description: 제외할 산들의 이름을 가진 JSON 배열 (URL 인코딩 필요)
 *         required: true
 *         schema:
 *           type: string
 *           example: '["북한산","도봉산"]'
 *     responses:
 *       200:
 *         description: 성공적으로 다른 산의 등산로를 추천함
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trailName:
 *                   type: string
 *                   description: 산의 이름
 *                   example: "인왕산"
 *                 distance:
 *                   type: number
 *                   description: 등산로의 길이 (미터 단위)
 *                   example: 4500
 *                 difficulty:
 *                   type: string
 *                   description: 등산로의 난이도
 *                   example: "medium"
 *                 coordinates:
 *                   type: array
 *                   description: 등산로의 좌표 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         example: 37.5740
 *                       lng:
 *                         type: number
 *                         example: 126.9623
 *       400:
 *         description: 잘못된 파라미터 또는 파라미터 누락
 *       404:
 *         description: 대체 등산로를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
