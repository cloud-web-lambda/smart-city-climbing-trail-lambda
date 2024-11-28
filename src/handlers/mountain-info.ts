export { handler } from '@/modules/mountain-info/mountain-info.handler';
/**
 * @swagger
 * /mountain-info:
 *   get:
 *     summary: Get mountain information
 *     description: Retrieves weather, air quality, and sun time for a specific trail.
 *     parameters:
 *       - in: query
 *         name: trailName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the mountain trail
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 weather:
 *                   type: object
 *                 airQuality:
 *                   type: object
 *                 sunTimes:
 *                   type: object
 *       400:
 *         description: Missing trail name
 *       500:
 *         description: Internal server error
 */
