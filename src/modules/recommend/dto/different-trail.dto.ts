export class TrailDTO {
  trailName: string;
  distance: number;
  difficulty: string;
  coordinates: { lat: number; lng: number }[];

  constructor(init?: Partial<TrailDTO>) {
    Object.assign(this, init);
  }
}
