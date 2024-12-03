export { handler } from '@/modules/record/get-climbing-track.handler';

/**
 * @swagger
 * /climbing/track/{sub}:
 *   get:
 *     summary: Get monthly climbing track for a specific user
 *     description: |
 *       [등산기록 조회 페이지]
 *       - 전체 사용자의 등산기록을 조회합니다.
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully retrieved monthly climbing statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalHikingTime:
 *                   type: number
 *                   description: Total hiking time in seconds
 *                   example: 21802
 *                 totalDistance:
 *                   type: number
 *                   description: Total distance covered in kilometers
 *                   example: 60
 *                 totalCalories:
 *                   type: number
 *                   description: Total calories burned during the climbs
 *                   example: 1035
 *                 averageHikingTime:
 *                   type: number
 *                   description: Average hiking time per session in seconds
 *                   example: 7267.333333333333
 *                 averageDistance:
 *                   type: number
 *                   description: Average distance covered per session in kilometers
 *                   example: 20
 *                 averageCalories:
 *                   type: number
 *                   description: Average calories burned per session
 *                   example: 345
 *                 trails:
 *                   type: array
 *                   description: List of trails climbed by the user
 *                   items:
 *                     type: string
 *                     example: "백두산"
 *                   example: ["백두산", "북한산"]  # 배열 형태로 예시 제공
 *       400:
 *         description: Missing parameter
 *       500:
 *         description: Internal server error
 */
