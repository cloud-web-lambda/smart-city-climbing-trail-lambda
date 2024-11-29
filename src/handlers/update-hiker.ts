export { handler } from '@/modules/mypage/update-hiker.handler';

/**
 * @swagger
 * /hikers:
 *   post:
 *     summary: Create or update hiker information
 *     description: |
 *       [마이 페이지]
 *       - 등산객의 신체정보(몸무게)를 저장합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sub:
 *                 type: string
 *                 description: The unique identifier of the user (e.g., user1).
 *                 example: "user1"
 *               weight:
 *                 type: integer
 *                 description: The weight of the hiker (in kilograms).
 *                 example: 68
 *     responses:
 *       200:
 *         description: Successfully created or updated hiker information
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
 *         description: Missing sub or weight
 *       500:
 *         description: Internal server error
 */
