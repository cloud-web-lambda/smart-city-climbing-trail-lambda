interface hikerDTOProps {
  sub: string | null;
  weight: number | null;
}

export class hikerDTO implements hikerDTOProps {
  sub: string | null;
  weight: number | null;

  constructor(props: hikerDTOProps) {
    this.sub = props.sub;
    this.weight = props.weight;
  }
}
