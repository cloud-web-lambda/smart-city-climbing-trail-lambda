interface SubwayStationDTOProps {
  stationName: string;
  stationLine: string;
  lat: number;
  lng: number;
}

export class SubwayStationDTO implements SubwayStationDTOProps {
  stationName: string;
  stationLine: string;
  lat: number;
  lng: number;

  constructor(props: SubwayStationDTOProps) {
    this.stationName = props.stationName;
    this.stationLine = props.stationLine;
    this.lat = props.lat;
    this.lng = props.lng;
  }
}
