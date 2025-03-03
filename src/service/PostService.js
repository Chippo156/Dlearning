import { header } from "framer-motion/m";
import axios from "../utils/CustomAxios";
import { toast } from "react-toastify";

export const createPost = async (formData) => {
  try {
    const response = await axios.post("api/v1/posts/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.data) {
      toast.success("Created Post Succesfully");

      return response.data.data;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error in create Post:", error);
    throw error;
  }
};

export const getAllPosts = async (currentPage, filterQuery) => {
  try {
    let url = `api/v1/posts/get-all-post?page=${currentPage}`;
    if (filterQuery) {
      const formattedQuery = `content~~'*${encodeURIComponent(filterQuery)}*'
      or user.fullName~~'*${encodeURIComponent(filterQuery)}*'`;
      url += `&filter=${formattedQuery}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error in get all posts:", error);
    throw error;
  }
};
export const getAllPostsByUser = async (currentPage, filterQuery) => {
  try {
    let url = `api/v1/posts/get-post-current-login?page=${currentPage}`;
    if (filterQuery) {
      const formattedQuery = `content~~'*${encodeURIComponent(filterQuery)}*'`;
      url += `&filter=${formattedQuery}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error in get all posts by user:", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`api/v1/posts/delete-post/${postId}`);
    if (response.data) {
      toast.success("Deleted Post Succesfully");
      return response.data;
    } else {
      toast.error(response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error in delete Post:", error);
    throw error;
  }
};
