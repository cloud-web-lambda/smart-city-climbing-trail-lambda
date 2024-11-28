export { handler } from '@/modules/mypage/get-hiker.handler';

/**
 * @swagger
 * /hikers:
 *   get:
 *     summary: Get hiker details by sub
 *     description: Fetch details of a hiker based on the sub (user identifier).
 *     parameters:
 *       - name: sub
 *         in: query
 *         description: The unique identifier of the user (e.g., user1).
 *         required: true
 *         schema:
 *           type: string
 *           example: "user1"
 *     responses:
 *       200:
 *         description: Successfully fetched hiker details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sub:
 *                   type: string
 *                   example: "user1"
 *                 weight:
 *                   type: integer
 *                   example: 68
 *       400:
 *         description: Invalid subS
 *       500:
 *         description: Internal server error
 */