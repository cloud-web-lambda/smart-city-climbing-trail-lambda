export { handler } from '@/modules/login/refreshToken.handler';

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급하고 사용자 정보를 반환
 *     description: |
 *       이 API는 헤더에 전달된 액세스 토큰을 검증하고, 요청 본문에 포함된 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.
 *       - 사용자 정보로는 `username`, `email`, `isValid` 상태가 포함됩니다.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: 인증을 위한 Bearer 액세스 토큰입니다.
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     requestBody:
 *       description: 리프레시 토큰을 포함한 사용자 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자의 이메일 주소입니다.
 *                 example: "pyeonk33@gmail.com"
 *               refreshToken:
 *                 type: string
 *                 description: 사용자의 리프레시 토큰입니다.
 *                 example: "eyJjdHkiOiJKV1QiLCJlbmMik0Ne5ZFhqw"
 *     responses:
 *       200:
 *         description: 리프레시 토큰을 사용하여 액세스 토큰을 성공적으로 발급하고 사용자 정보를 반환했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: "8408edcc-6091-70b1-1601-36f47e91b209"
 *                 email:
 *                   type: string
 *                   example: "pyeonk33@gmail.com"
 *                 isValid:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: 잘못된 요청 - 액세스 토큰 또는 리프레시 토큰이 잘못되었습니다.
 *       401:
 *         description: 인증되지 않음 - 만료되었거나 유효하지 않은 액세스 토큰 또는 리프레시 토큰입니다.
 *       500:
 *         description: 서버 내부 오류
 */
