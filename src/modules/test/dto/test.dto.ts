interface TestDTOProps {
  name: string;
  age: number;
}

export class TestDTO implements TestDTOProps {
  name: string;
  age: number;

  constructor(props: TestDTOProps) {
    this.name = props.name;
    this.age = props.age;
  }
}
