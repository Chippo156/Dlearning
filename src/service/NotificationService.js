import axios from "../utils/CustomAxios";

export const notificationCurrentLogin = async () => {
  try {
    const response = await axios.get(`api/v1/notifications/current`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axios.put(
      `api/v1/notifications/mark-as-read/${notificationId}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
