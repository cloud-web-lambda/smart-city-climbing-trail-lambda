export { handler } from '@/modules/login-test/logout.handler';

/**
 * @swagger
 * /sign-out:
 *   post:
 *     summary: Log out from the application
 *     description: Logs out the user from all sessions using the provided access token
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer access token for authentication
 *         required: true
 *         type: string
 *         example: "eyJraWQiOiJoQzJzRUtzb0VyengxVlk5T1JcL3U4ZnZnYjZnSEJkcFc4MjVhNzNcLyt2V2M9IiwiYWxnIjoiUlMyNTYifQ..."
 *     responses:
 *       200:
 *         description: Successfully logged out from all sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully logged out from all sessions."
 *       400:
 *         description: Invalid AccessToken
 *       500:
 *         description: Internal server error
 * x-notes:
 *   - "To get your access token, you need to log in using the '/sign-in' endpoint."
 *   - "Use your email and password to receive the access token."
 *   - "Example request for '/sign-in' endpoint: {\"email\": \"your-email@example.com\", \"password\": \"yourPassword123\"}"
 *   - "Once logged in, you will receive the access token in the response. Use it in the 'Authorization' header for this endpoint."
 */
