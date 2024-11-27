export interface SunTimeDTOProps {
  sunrise: string;
  sunset: string;
}

export class SunTimeDTO implements SunTimeDTOProps {
  sunrise: string;
  sunset: string;

  constructor(props: SunTimeDTOProps) {
    this.sunrise = props.sunrise;
    this.sunset = props.sunset;
  }
}
