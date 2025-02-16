import axios from "../utils/CustomAxios";
import { toast } from "react-toastify";

export const login = async (email, password) => {
  try {
    const response = await axios.post("api/v1/auth/sign-in", {
      email,
      password,
    });
    if (response.data.code === 401) {
      toast.error("Invalid email or password");
      return;
    }
    return response.data;
  } catch (error) {
    console.error("Erorr logging in : ", error);
  }
};
export const introspect = async (token) => {
  try {
    const response = await axios.post("api/v1/auth/introspect", { token });
    if (response.data.code === 400) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("Erorr logging in : ", error);
    throw new Error(error);
  }
};

export const logout = async (token) => {
  const response = await axios.post("api/v1/auth/logout", {
    token: token,
  });
  return response;
};
