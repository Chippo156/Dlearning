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
    const response = await axios.post(`api/v1/user/create-user`, formData, {
      params: {
        otp: otp,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const myInfo = async () => {
  try {
    const response = await axios.get(`api/v1/user/my-info`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAvatar = async () => {
  try {
    const response = await axios.get(`api/v1/user/get-avatar`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getPoints = async () => {
  try {
    const response = await axios.get(`api/v1/user/get-points-current`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendOtp = async (email) => {
  try {
    const response = await axios.post(`api/v1/user/send-otp-register`, {
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
