// 좌표 타입 정의
interface Coordinate {
  lat: number; // 위도
  lng: number; // 경도
}

interface TrailDTOProps {
  trailName: string; // 등산로 이름
  distance: number; // 등산로 구간거리
  difficulty: string; // 난이도
  coordinates: Coordinate[]; // 좌표 배열
}

export class TrailDTO implements TrailDTOProps {
  trailName: string;
  distance: number;
  difficulty: string;
  coordinates: Coordinate[]; // 좌표 배열 타입 추가

  constructor(props: TrailDTOProps) {
    this.trailName = props.trailName;
    this.distance = props.distance;
    this.difficulty = props.difficulty;
    this.coordinates = props.coordinates; // 좌표 할당
  }
}
