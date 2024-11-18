interface PostDTOProps {
  title: string;
  body: string;
}

export class PostDTO {
  title: string;
  body: string;

  constructor(props: PostDTOProps) {
    this.title = props.title;
    this.body = props.body;
  }
}
