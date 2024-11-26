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
}
