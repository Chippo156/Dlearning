import axios from "../utils/CustomAxios";

export const checkPurchase = async (courseId) => {
  try {
    const response = await axios.get(
      `api/v1/enrollments/check-course-purchased/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const isCompleteCourse = async (courseId) => {
  try {
    const response = await axios.post(`api/v1/enrollments/is-complete-course`, {
      courseId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
