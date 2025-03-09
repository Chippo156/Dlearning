import { toast } from "react-toastify";
import axios from "../utils/CustomAxios";

export const createFavourite = async (courseId) => {
  try {
    const response = await axios.post(`api/v1/favourite/create-favourite`, {
      id: courseId,
    });
    if (response.data.message === "Already in favourites") {
      toast.error("Already in favourites");
    }
  } catch (error) {
    console.error(error);
  }
};
export const getAllFavourite = async (currentPage, pageSize) => {
  try {
    const response = await axios.get(`api/v1/favourite/get-all-favourites`, {
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
