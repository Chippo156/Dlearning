import axios from "../utils/CustomAxios";

export const markLessonAsCompleted = async (lessonId) => {
  try {
    const response = await axios.post(
      `api/v1/lesson-progress/mark-lesson-as-complete`,
      {
        lessonId,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCompletionPercentage = async (courseId) => {
  try {
    const response = await axios.get(
      `api/v1/lesson-progress/calculate-completion/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
