export interface GetPostsArgs {}

export interface GetPostsResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}
