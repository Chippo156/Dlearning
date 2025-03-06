import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import {
  markNotificationAsRead,
  notificationCurrentLogin,
} from "../service/NotificationService";

export const useNotification = (wsClient) => {
  const authContext = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wsClient.onConnect = () => {
      wsClient.subscribe("/user/queue/notifications", (message) => {
        const notification = JSON.parse(message.body);
        console.log("====================================");
        console.log("New notification:", notification);
        console.log("====================================");
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });
    };
  }, [wsClient]);

  useEffect(() => {
    if (!authContext.authenticated) {
      setLoading(false);
      return;
    }

    notificationCurrentLogin()
      .then((result) => {
        const unread = result.data.filter((n) => !n.isRead).length;
        setNotifications(result.data || []);
        setUnreadCount(unread || 0);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authContext.authenticated]);

  const markAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setUnreadCount((prev) => prev - 1);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Lỗi khi đánh dấu thông báo là đã đọc:", error);
    }
  };
  return { notifications, unreadCount, markAsRead, loading };
};
