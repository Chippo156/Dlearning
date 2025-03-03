import axios from "../utils/CustomAxios";

export const sendOtpForgotPassword = async (email) => {
  try {
    const response = await axios.post(`api/v1/user/send-otp-forgot-password`, {
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const verifyOtpForgotPassword = async (email, otp) => {
  try {
    const response = await axios.post(`api/v1/user/verify-otp`, {
      email: email,
      otp: otp,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const resetPassword = async (email, password, confirmPassword) => {
  try {
    const response = await axios.post(`api/v1/user/reset-password`, {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
