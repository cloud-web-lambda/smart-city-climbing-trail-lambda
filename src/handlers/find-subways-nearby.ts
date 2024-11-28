export { handler } from '@/modules/recommend/find-subways-nearby.handler';

/**
 * @swagger
 * /subways/nearby:
 *   get:
 *     summary: Get nearby subway station information
 *     description: Retrieves the nearest subway station information based on provided latitude and longitude.
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
