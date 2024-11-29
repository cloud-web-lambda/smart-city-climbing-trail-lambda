export { handler } from '@/modules/recommend/find-subways-nearby.handler';

/**
 * @swagger
 * /subways/nearby:
 *   get:
 *     summary: Get nearby subway station information
 *     description: |
 *       [가까운 지하철 정보 제공 페이지]
 *       - 하산할 때, 사용자 위치로부터 가까운 지하철 역 정보를 제공합니다.
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         description: Latitude of the user's location
 *         schema:
 *           type: number
 *           format: float
 *           example: 37.413294
 *       - in: query
 *         name: lng
 *         required: true
 *         description: Longitude of the user's location
 *         schema:
 *           type: number
 *           format: float
 *           example: 127.0277194
 *     responses:
 *       200:
 *         description: Successfully retrieved nearby subway station information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stationName:
 *                   type: string
 *                   description: Name of the nearby subway station
 *                   example: "시청"
 *                 stationLine:
 *                   type: integer
 *                   description: Line number of the subway station
 *                   example: 1
 *                 lat:
 *                   type: number
 *                   format: float
 *                   description: Latitude of the nearby subway station
 *                   example: 37.56359
 *                 lng:
 *                   type: number
 *                   format: float
 *                   description: Longitude of the nearby subway station
 *                   example: 126.975407
 *       400:
 *         description: Invalid or missing query parameters
 *       500:
 *         description: Internal server error
 */
