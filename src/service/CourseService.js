import axios from "../utils/CustomAxios";

export const getAllCourses = async (currentPage, pageSize, keyword) => {
  try {
    const response = await axios.get(
      `api/v1/courses/get-course-elastic-search`,
      {
        params: {
          page: currentPage,
          size: pageSize,
          keyword: keyword,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllCoursesCaching = async (currentPage, pageSize, keyword) => {
  try {
    const response = await axios.get(`api/v1/courses/get-courses-caching`, {
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
export const filterCourse = async (sortBy, search) => {
  try {
    const response = await axios.get(`api/v1/courses/filter-courses-spec`, {
      params: {
        sortBy: sortBy,
        search,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const filterCourseOldest = async (currentPage, pageSize) => {
  try {
    const response = await axios.get(`api/v1/courses/find-course-oldest`, {
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
export const filterCourseNewest = async (currentPage, pageSize) => {
  try {
    const response = await axios.get(`api/v1/courses/find-course-newest`, {
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
