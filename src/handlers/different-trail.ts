export { handler } from '@/modules/recommend/different-trail.handler';

/**
 * @swagger
 * /climbing/trail/different:
 *   get:
 *     summary: 다른 산의 등산로 추천 조회
 *     description: 사용자의 위치와 원하는 난이도에 따라 제외할 산들을 제외하고 다른 산의 등산로를 추천합니다.
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: string
 *         description: 현재 위치의 위도.
 *         example: "37.565189"
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: string
 *         description: 현재 위치의 경도.
 *         example: "126.966055"
 *       - in: query
 *         name: difficulty
 *         required: true
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *         description: 등산로의 난이도 (easy, medium, hard).
 *         example: "easy"
 *       - in: query
 *         name: excludedMountains
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: 제외할 산들의 이름 목록.
 *         example: ["안산", "인왕산"]
 *     responses:
 *       200:
 *         description: 다른 등산로를 성공적으로 추천했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrailDTO'
 *       400:
 *         description: 잘못된 요청 - 필수 파라미터가 누락되었거나 유효하지 않습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: 서버 내부 오류.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * components:
 *   schemas:
 *     TrailDTO:
 *       type: object
 *       properties:
 *         trailName:
 *           type: string
 *           description: 등산로의 이름.
 *           example: "고은산"
 *         distance:
 *           type: string
 *           description: 등산로의 거리 (미터 단위).
 *           example: "210"
 *         difficulty:
 *           type: string
 *           description: 등산로의 난이도.
 *           example: "하"
 *         coordinates:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               lat:
 *                 type: number
 *                 description: 등산로 좌표의 위도.
 *                 example: 37.58425949337148
 *               lng:
 *                 type: number
 *                 description: 등산로 좌표의 경도.
 *                 example: 126.94293272074904
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: 발생한 오류에 대한 메시지.
 *           example: "Bad Request: Missing required parameters."
 */
