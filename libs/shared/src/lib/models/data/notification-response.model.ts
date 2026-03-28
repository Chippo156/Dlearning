export interface NotificationResponse {
  id: number;
  senderId: number;
  username: string;
  title: string;
  message: string;
  isRead: boolean;
  avatarUrl?: string;
  url: string;
}
