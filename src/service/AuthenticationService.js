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
    if (!token) {
      throw new Error("Token is missing");
    }
    const response = await axios.post(`api/v1/auth/introspect`, {
      token: token,
    });

    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("Invalid introspect response structure");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to introspect token";

    throw new Error(errorMessage);
  }
};

export const logout = async (token) => {
  const response = await axios.post("api/v1/auth/logout", {
    token: token,
  });
  return response;
};
