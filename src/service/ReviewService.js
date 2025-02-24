import axios from "../utils/CustomAxios";

export const getAllReviewsLesson = async (lessonId) => {
  try {
    const response = await axios.get(
      `api/v1/review/reviewByCourse/${lessonId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addCommentLesson = async (commentData) => {
  try {
    const response = await axios.post(
      "api/v1/review/add-review-lesson",
      commentData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
