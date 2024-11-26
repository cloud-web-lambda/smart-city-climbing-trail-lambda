interface ClimbingTotalDTOProps {
    totalHikingTime: number;
    totalDistance: number;
    totalCalories: number;
    averageHikingTime: number;
    averageDistance: number;
    averageCalories: number;
    trails: string[];
  }
  
  export class ClimbingTotalDTO implements ClimbingTotalDTOProps {
    totalHikingTime: number;
    totalDistance: number;
    totalCalories: number;
    averageHikingTime: number;
    averageDistance: number;
    averageCalories: number;
    trails: string[];
  
    constructor(props: ClimbingTotalDTOProps) {
      this.totalHikingTime = props.totalHikingTime;
      this.totalDistance = props.totalDistance;
      this.totalCalories = props.totalCalories;
      this.averageHikingTime = props.averageHikingTime;
      this.averageDistance = props.averageDistance;
      this.averageCalories = props.averageCalories;
      this.trails = props.trails;
    }
  }
  