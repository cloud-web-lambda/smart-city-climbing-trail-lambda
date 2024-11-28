export { handler } from '@/modules/recommend/init-subways-nearby.handler';

/**
 * @swagger
 * /subways/nearby:
 *   post:
 *     summary: Upload subway station information
 *     description: Sends subway station data and updates the system with nearby subway station information.
 *     responses:
 *       200:
 *         description: Subway information uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code
 *                   example: 200
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: "지하철 정보가 업로드되었습니다."
 *       500:
 *         description: Internal server error
 */
