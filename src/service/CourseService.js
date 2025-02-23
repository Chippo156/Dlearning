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

export const getCourseDetailById = async (id) => {
  try {
    const response = await axios.get(`api/v1/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getChapterById = async (id) => {
  try {
    const response = await axios.get(`api/v1/courses/get-info-course/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const buyCourse = async (courseId) => {
  try {
    const response = await axios.post(`api/v1/courses/buy-course`, {
      courseId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
