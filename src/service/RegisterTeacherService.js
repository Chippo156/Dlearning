import axios from "../utils/CustomAxios";

export const registerTeacher = async (formDataToSend) => {
  try {
    const response = await axios.post(
      `api/v1/register-teacher`,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in registerTeacher API:", error);
    throw error;
  }
};

export const createPasswordForFirst = async (password) => {
  try {
    const response = await axios.post(`api/v1/create-password`, { password });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
