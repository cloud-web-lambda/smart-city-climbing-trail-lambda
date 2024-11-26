export interface WeatherDTOProps {
  temperature: number;
  condition: number; // 강수 형태
  windSpeed: number;
}

export class WeatherDTO implements WeatherDTOProps {
  temperature: number;
  condition: number;
  windSpeed: number;

  constructor(props: WeatherDTOProps) {
    this.temperature = props.temperature;
    this.condition = props.condition;
    this.windSpeed = props.windSpeed;
  }

  // 동적 rainWarning getter
  get rainWarning(): boolean {
    return this.condition > 0; // 강수 형태가 0보다 크면 경고
  }

  // 동적 windWarning getter
  get windWarning(): boolean {
    return this.windSpeed > 10; // 풍속이 10m/s 초과하면 경고
  }

  toJSON() {
    return {
      temperature: this.temperature,
      condition: this.condition,
      windSpeed: this.windSpeed,
      rainWarning: this.rainWarning,
      windWarning: this.windWarning,
    };
  }
}
