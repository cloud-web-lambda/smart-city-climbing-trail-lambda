export { handler } from '@/modules/record/update-climbing-track.handler';

/**
 * @swagger
 * /climbing/track/{sub}:
 *   post:
 *     summary: Add a new climbing track entry for a user
 *     description: |
 *       [등산기록 저장 페이지]
 *       - 사용자의 등산기록을 저장합니다.
 *     parameters:
 *       - name: sub
 *         in: path
 *         description: The unique identifier for the user (e.g., user1).
 *         required: true
 *         schema:
 *           type: string
 *           example: "user1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trailName:
 *                 type: string
 *                 description: The name of the trail climbed
 *                 example: "북한산"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: The start time of the climbing activity
 *                 example: "2024-11-13T00:00:00"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: The end time of the climbing activity
 *                 example: "2024-11-13T00:00:30"
 *               distance:
 *                 type: number
 *                 description: The total distance covered during the climb in kilometers
 *                 example: 20
 *               calories:
 *                 type: number
 *                 description: The total calories burned during the climb
 *                 example: 345
 *     responses:
 *       200:
 *         description: Successfully added a new climbing track entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sub:
 *                   type: string
 *                   description: The unique identifier for the user
 *                   example: "user1"
 *                 trailName:
 *                   type: string
 *                   description: The name of the trail climbed
 *                   example: "백두산"
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   description: The start time of the climbing activity
 *                   example: "2024-11-13T00:00:00.000Z"
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   description: The end time of the climbing activity
 *                   example: "2024-11-13T00:00:30.000Z"
 *                 distance:
 *                   type: number
 *                   description: The total distance covered during the climb in kilometers
 *                   example: 20
 *                 calories:
 *                   type: number
 *                   description: The total calories burned during the climb
 *                   example: 345
 *       400:
 *         description: Invalid or missing input
 *       500:
 *         description: Internal server error
 */
