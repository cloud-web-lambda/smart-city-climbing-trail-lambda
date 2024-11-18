import { testApiClient } from '@/utils/apiClient';
import type { GetPostsArgs, GetPostsResponse } from './interfaces/post.interface';
import { HttpException } from '@/common/vo/http-exception.vo';
import { HttpStatus } from '@/common/constants/http-status';

export class PostRepository {
  private static instance: PostRepository;

  private constructor() {
    if (!PostRepository.instance) PostRepository.instance = this;
    return PostRepository.instance;
  }

  static getInstance() {
    return new PostRepository();
  }

  async getPosts({}: GetPostsArgs) {
    try {
      const { data } = await testApiClient.get<GetPostsResponse[]>('/posts');
      return data;
    } catch (error) {
      throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }
}
