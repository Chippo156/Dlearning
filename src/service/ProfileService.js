import axios from "../utils/CustomAxios";

export const getInforProfile = async () => {
  try {
    const response = await axios.get(`api/v1/profile/get-info`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateProfile = async (data) => {
  try {
    const response = await axios.put(`api/v1/profile/update-profile`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
