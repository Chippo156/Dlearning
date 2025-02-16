import axios from "../utils/CustomAxios";

export const getAllCourses = async (currentPage, pageSize) => {
  try {
    const response = await axios.get(`api/v1/courses/get-all-courses`, {
      params: {
        page: currentPage,
        size: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
