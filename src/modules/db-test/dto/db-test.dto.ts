interface DBTestDTOProps {
  name: string;
  age: number;
}

export class DBTestDTO implements DBTestDTOProps {
  name: string;
  age: number;

  constructor(props: DBTestDTOProps) {
    this.name = props.name;
    this.age = props.age;
  }
}
