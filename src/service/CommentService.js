import { toast } from "react-toastify";
import axios from "../utils/CustomAxios";

export const createComment = async (comment) => {
  try {
    const response = await axios.post("api/v1/comment/create-comment", comment);
    if (response.data.code === 201) {
      toast.success("Comment created successfully");
      return response.data;
    }
  } catch (error) {
    toast.error("Failed to create comment");
    console.error("Error creating comment: ", error);
  }
};
export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(
      `api/v1/comment/delete-comment/${commentId}`
    );
    if (response.data.code === 200) {
      toast.success("Comment deleted successfully");
      return response.data;
    }
  } catch (error) {
    toast.error("Failed to delete comment");
    console.error("Error deleting comment: ", error);
  }
};

export const updateComment = async (commentId, content) => {
  try {
    const response = await axios.put(
      `api/v1/comment/update-comment/${commentId}`,
      {
        content,
      }
    );
    if (response.data.code === 201) {
      toast.success("Comment updated successfully");
      return response.data;
    }
  } catch (error) {
    toast.error("Failed to update comment");
    console.error("Error updating comment: ", error);
  }
};

export const getComments = async (postId, currentPage) => {
  try {
    const response = await axios.get(
      `api/v1/comment/get-comment-by-post-id/${postId}`,
      currentPage
    );
    return response.data.data;
  } catch (error) {
    console.error("Error getting comments: ", error);
  }
};
