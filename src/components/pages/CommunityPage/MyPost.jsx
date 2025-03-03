import { ToastContainer } from "react-toastify";
import { getAvatar } from "../../../service/UserSevice";
import { getAllPostsByUser } from "../../../service/PostService";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { SideBarCommunity } from "./components/SideBarCommunity";
import { PostList } from "./components/PostList";

export const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterQuery, setFilterQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "My Post";
    if (!token) {
      setLoading(false);
      return;
    }
  }, [token]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllPostsByUser(currentPage, filterQuery);
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      if (response && Array.isArray(response.data.result)) {
        const newPosts = response.data.result;
        if (currentPage === 1) {
          setPosts(newPosts);
        } else {
          setPosts((prevPost) => [
            ...prevPost,
            ...newPosts.filter(
              (post) => !prevPost.some((p) => p.id === post.id)
            ),
          ]);
        }
        setHasMore(currentPage < response.data.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }, [currentPage, filterQuery]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlesearchPost = () => {
    setIsSearching(true);
    setPosts([]);
    setCurrentPage(1);

    setTimeout(() => {
      fetchPostsCurrentLogin(1, filterQuery);
    }, 2000);
  };
  const handleDeletePost = (postId) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "Do you want to delete this post ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete now",
      cancelButtonText: "No, cancel",
      width: "370px",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePost(postId);
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
          );
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted.",
            icon: "success",
            width: "370px",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text:
              error.message ||
              "Đã xảy ra lỗi trong quá trình mua khóa học. Vui lòng thử lại sau.",
            icon: "error",
          });
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="content-page">
      <div className="community-container d-flex">
        <SideBarCommunity
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
          handlesearchPost={handlesearchPost}
        />
        <div className="main-content">
          <PostList
            posts={posts}
            loading={loading}
            isSearching={isSearching}
            hasMore={hasMore}
            setCurrentPage={setCurrentPage}
            handleDeletePost={handleDeletePost}
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ top: "20%", right: "20px" }}
      />
    </div>
  );
};
