import { PostDTO } from './dto/post.dto';
import { PostRepository } from './post.repository';

export class PostService {
  private static instance: PostService;

  private constructor() {
    if (!PostService.instance) PostService.instance = this;
    return PostService.instance;
  }

  static getInstance() {
    return new PostService();
  }

  async getPosts() {
    const posts = await PostRepository.getInstance().getPosts({});
    return posts.map((post) => new PostDTO(post));
  }
}
