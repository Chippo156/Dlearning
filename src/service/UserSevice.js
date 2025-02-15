import axios from "../utils/CustomAxios";

export const checkUserExists = async (email) => {
  try {
    const response = await axios.get(`api/v1/user/check-exist-user`, {
      params: {
        email,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const registerUser = async (otp, formData) => {
  try {
    const response = await axios.post(`api/v1/user/create-user`, {
      ...formData,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
