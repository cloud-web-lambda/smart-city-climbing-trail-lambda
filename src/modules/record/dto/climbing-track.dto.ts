interface ClimbingTrackDTOProps {
  sub: string;
  trailName: string;
  startDate: Date; // string -> date
  endDate: Date;
  distance: number;
  calories: number;
}

export class ClimbingTrackDTO implements ClimbingTrackDTOProps {
  sub: string;
  trailName: string;
  startDate: Date; // string -> date
  endDate: Date;
  distance: number;
  calories: number;

  constructor(props: ClimbingTrackDTOProps) {
    this.sub = props.sub;
    this.trailName = props.trailName;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.distance = props.distance;
    this.calories = props.calories;
  }
}
