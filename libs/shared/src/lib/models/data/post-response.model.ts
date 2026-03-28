export interface PostResponse {
  id: number;
  name: string;
  avatar: string;
  content: string;
  image?: string;
  likeCount?: number;
  owner?: boolean;
  createdAt: string;
}
