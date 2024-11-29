/**
 * @swagger
 * /mountain-info:
 *   get:
 *     summary: 특정 등산로의 종합 정보 조회
 *     description: 지정된 등산로의 날씨, 대기질, 일출 및 일몰 시간을 제공합니다.
 *     parameters:
 *       - in: query
 *         name: trailName
 *         required: true
 *         schema:
 *           type: string
 *         description: 등산로의 이름
 *     responses:
 *       200:
 *         description: 성공적으로 등산로 정보를 가져옴
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 weather:
 *                   type: object
 *                   description: 날씨 정보
 *                   properties:
 *                     temperature:
 *                       type: number
 *                       description: 현재 기온 (섭씨)
 *                       example: 22.5
 *                     condition:
 *                       type: string
 *                       description: 날씨 상태 (예: 맑음, 흐림)
 *                       example: "맑음"
 *                     windSpeed:
 *                       type: number
 *                       description: 풍속 (m/s)
 *                       example: 3.4
 *                 airQuality:
 *                   type: object
 *                   description: 대기질 정보
 *                   properties:
 *                     pm10:
 *                       type: number
 *                       description: 미세먼지 농도 (㎍/㎥)
 *                       example: 45
 *                     pm2_5:
 *                       type: number
 *                       description: 초미세먼지 농도 (㎍/㎥)
 *                       example: 30
 *                     o3:
 *                       type: number
 *                       description: 오존 농도 (ppm)
 *                       example: 0.03
 *                 sunTimes:
 *                   type: object
 *                   description: 일출 및 일몰 시간
 *                   properties:
 *                     sunrise:
 *                       type: string
 *                       format: date-time
 *                       description: 일출 시간
 *                       example: "2023-10-05T06:30:00+09:00"
 *                     sunset:
 *                       type: string
 *                       format: date-time
 *                       description: 일몰 시간
 *                       example: "2023-10-05T18:15:00+09:00"
 *       400:
 *         description: 잘못된 요청 - 'trailName' 파라미터 누락 또는 유효하지 않음
 *       500:
 *         description: 서버 내부 오류
 */
export { handler } from '@/modules/mountain-info/mountain-info.handler';
