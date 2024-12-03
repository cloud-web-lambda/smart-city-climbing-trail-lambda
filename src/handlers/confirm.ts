export { handler } from '@/modules/login/confirm.handler';

/**
 * @swagger
 * /confirm:
 *   post:
 *     summary: 인증 코드 확인
 *     description: |
 *       [회원가입 페이지]
 *       - 이메일로 전송된 인증코드를 검증하여 회원가입을 완료합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sub:
 *                 type: string
 *                 description: 사용자의 고유 ID (sub)
 *                 example: "94e8dd9c-80c1-70f7-c068-25386c735cb2"
 *               confirmationCode:
 *                 type: string
 *                 description: 인증 코드
 *                 example: "288386"
 *     responses:
 *       200:
 *         description: 인증 성공, 회원가입이 완료되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "94884d9c-e041-70ee-3b29-a9564ef4f469님, 회원 가입과 인증이 성공적으로 완료되었습니다."
 *                 confirmResponse:
 *                   type: object
 *                   properties:
 *                     $metadata:
 *                       type: object
 *                       properties:
 *                         httpStatusCode:
 *                           type: integer
 *                           example: 200
 *                         requestId:
 *                           type: string
 *                           example: "ac35dde1-bb43-42d5-a983-75dfe03e6686"
 *                         attempts:
 *                           type: integer
 *                           example: 1
 *                         totalRetryDelay:
 *                           type: integer
 *                           example: 0
 *                     Session:
 *                       type: string
 *                       example: "AYABeA3gcrf4vNh7WOTpjILyZ9sAHQABAAdTZXJ2aWNlABBDb2duaXRvVXNlclBvb2xzAAEAB2F3cy1rbXMAUGFybjphd3M6a21zOmFwLW5vcnRoZWFzdC0yOjY5OTk5OTk3OTg5OTprZXkvYTYxNzAwZmQtMmVlYi00NzgyLWJlZjgtYjdhY2NlZjNjYzRiALgBAgEAeK0hGvRyqg86ee0d1pzYOvWTcaqOLNpxRUWkiCDL3zoGAbPUDF-cHupHiH0SDHbOzLAAAAB-MHwGCSqGSIb3DQEHBqBvMG0CAQAwaAYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAwPv1W42fOPBXAIrq0CARCAO8YP_NcXy3GlgPeMvz1SjEwVXvXH2zZSc0MeWS238Cg1-87dGo1mXepB-vYfhmf0yfhH2qVsNgGD1jxuAgAAAAAMAAAQAAAAAAAAAAAAAAAAAIYRKkilNPVQwfSkFOYxOs______AAAAAQAAAAAAAAAAAAAAAQAAAWSS9kDcze6YFtEv-KrUwQpsJHX_OLY82M1exOzHYc2oJXWn4u0gYaHDdI3YPImNscNAizyFzqthdE-f-57UOCZ0ilc3EWmEJiOvSddwi2NAfXhV67XaxjuOKdDnHCtG2sznR5tn8_Rvye-KATGpAqG-r3I8zNWFg8b7KLXN-6eJJaKdjbu58xK_vTEDry2FGdglEqLqF_hHN4WdDR-fLuRozFcAY3m_eDqTQ_bXaW-2WGSsTXHzDoyfmF1IyEBUT2hsAegyi0Lf2PSRahGKCOCi0q42SY6WX5L4oZ-ROqmmSZmst9PzaHQealpL2yAYc4fB5IwRFvT3Tdi6VCj5o76v99XEWykv7-mBI9rJid7ck-ZkDCnGS_3tOLtuNvXNlV4C58OzF69cjPspec1xNvdpGzViX_EqWiWfv83_Jj2Fu7hSdHjZHcgHEEe5qom6k7EQjeZES8zb6QTYGhNviMtaU6fq7dZwIfDvL25vHuQAffj0TyQ"
 *       400:
 *         description: 잘못된 인증 코드
 *       500:
 *         description: 서버 내부 오류
 */

