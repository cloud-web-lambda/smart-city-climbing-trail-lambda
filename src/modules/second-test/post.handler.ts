import { createGatewayHandler } from '@/lambda';
import { PostDTO } from './dto/post.dto';
import { PostService } from './post.service';
import { HttpStatus } from '@/common/constants/http-status';

export const handler = createGatewayHandler<PostDTO[]>(async (req, res) => {
  const posts = await PostService.getInstance().getPosts();

  return res({
    status: HttpStatus.OK,
    body: posts,
  });
});
