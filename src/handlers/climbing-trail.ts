export { handler } from '@/modules/recommend/climbing-trail.handler';

/**
 * @swagger
 * /climbing/trail:
 *   get:
 *     summary: Get climbing trail information
 *     description: Retrieves information about a climbing trail based on the provided coordinates and difficulty.
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *         description: Latitude of the trail starting point
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *         description: Longitude of the trail starting point
 *       - in: query
 *         name: difficulty
 *         required: true
 *         schema:
 *           type: string
 *           enum: [easy, moderate, hard]
 *         description: Difficulty level of the trail (easy, moderate, or hard)
 *     responses:
 *       200:
 *         description: Successfully retrieved trail information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trailName:
 *                   type: string
 *                   description: Name of the trail
 *                 distance:
 *                   type: string
 *                   description: The distance of the trail in meters
 *                 difficulty:
 *                   type: string
 *                   description: Difficulty level of the trail (in Korean)
 *                 coordinates:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         format: float
 *                         description: Latitude of a point on the trail
 *                       lng:
 *                         type: number
 *                         format: float
 *                         description: Longitude of a point on the trail
 *       400:
 *         description: Invalid or missing query parameters
 *       500:
 *         description: Internal server error
 */
