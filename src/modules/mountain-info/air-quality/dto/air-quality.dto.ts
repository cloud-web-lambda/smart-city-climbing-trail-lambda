/**
 * @swagger
 * components:
 *   schemas:
 *     AirQualityDTO:
 *       type: object
 *       properties:
 *         fineDustIndex:
 *           type: number
 *           description: 미세먼지 지수
 *         ultrafineDustIndex:
 *           type: number
 *           description: 초미세먼지 지수
 *         fineDustStatus:
 *           type: string
 *           enum: [Good, Bad]
 *           description: 미세먼지 상태 ('Good' 또는 'Bad')
 *         ultrafineDustStatus:
 *           type: string
 *           enum: [Good, Bad]
 *           description: 초미세먼지 상태 ('Good' 또는 'Bad')
 */

export interface AirQualityDTOProps {
  fineDustIndex: number;
  ultrafineDustIndex: number;
}

export class AirQualityDTO implements AirQualityDTOProps {
  fineDustIndex: number;
  ultrafineDustIndex: number;

  constructor(props: AirQualityDTOProps) {
    this.fineDustIndex = props.fineDustIndex;
    this.ultrafineDustIndex = props.ultrafineDustIndex;
  }

  get fineDustStatus(): 'Good' | 'Bad' {
    return this.fineDustIndex <= 50 ? 'Good' : 'Bad';
  }

  get ultrafineDustStatus(): 'Good' | 'Bad' {
    return this.ultrafineDustIndex <= 25 ? 'Good' : 'Bad';
  }

  toJSON() {
    return {
      fineDustIndex: this.fineDustIndex,
      ultrafineDustIndex: this.ultrafineDustIndex,
      fineDustStatus: this.fineDustStatus,
      ultrafineDustStatus: this.ultrafineDustStatus,
    };
  }
}
