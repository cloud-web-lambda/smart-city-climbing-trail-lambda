interface hikerDTOProps {
  sub: string;
  weight: number;
}

export class hikerDTO implements hikerDTOProps {
  sub: string;
  weight: number;

  constructor(props: hikerDTOProps) {
    this.sub = props.sub;
    this.weight = props.weight;
  }
}
