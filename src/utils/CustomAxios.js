import axios from "axios";
let refreshingFunc = undefined;

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

const refreshToken = async () => {
  try {
    const response = await instance.post("/api/v1/auth/refresh", {
      token: localStorage.getItem("token"),
    });
    if (response.status === 200) {
      const refreshToken = response.data.data.token;
      localStorage.setItem("token", refreshToken);
      return refreshToken;
    } else {
      throw new Error("Token refresh failed");
    }
  } catch (error) {
    console.error("Error refreshing token: ", error);

    throw error;
  }
};

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.url !== "/api/v1/auth/refresh") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return error && error.response && error.response
      ? error.response
      : Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "EXPIRED_TOKEN" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (!refreshingFunc) {
        refreshingFunc = refreshToken();
      }
      try {
        const newToken = await refreshingFunc;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        refreshingFunc = undefined;
        return instance(originalRequest);
      } catch (error) {
        refreshingFunc = undefined;
        localStorage.removeItem("token");
        window.location = `${window.location.origin}/login`;
        return Promise.reject(error);
      }
    }
    return error && error.response && error.response
      ? error.response
      : Promise.reject(error);
  }
);

export default instance;
