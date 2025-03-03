import { useCallback, useEffect, useState } from "react";
import { ModalCreatePost } from "./components/ModalCreatePost";
import { PostArticle } from "./components/PostArticle";
import { SideBarCommunity } from "./components/SideBarCommunity";
import { PostList } from "./components/PostList";
import { getAvatar } from "../../../service/UserSevice";
import {
  createPost,
  deletePost,
  getAllPosts,
} from "../../../service/PostService";
import { DatabaseFilled } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

export const CommunityPage = () => {
  const token = localStorage.getItem("token");
  const [avatar, setAvatar] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    content: "",
    image: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterQuery, setFilterQuery] = useState("");
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [test, setTest] = useState([
    {
      id: 1,
      content: "This is the first post",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      content: "This is the second post",
      image: "https://picsum.photos/200/300",
    },
  ]);
  const [item, setItem] = useState({
    id: 3,
    content: "This is the third post",
    image: "https://picsum.photos/200/300",
  });

  useEffect(() => {
    setTest((prev) => [
      ...prev,
      ...test.filter((t) => prev.some((p) => p.id === t.id)),
    ]);
    console.log("====================================");
    console.log(test);
    console.log("====================================");
  }, []);

  useEffect(() => {
    document.title = "Community Page";

    if (!token) {
      setLoading(false);
      return;
    }
    getAvatar()
      .then((response) => {
        setAvatar(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [token]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await getAllPosts(currentPage, filterQuery);

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
  const handleSearchPost = () => {
    setIsSearching(true);
    setPosts([]);
    setCurrentPage(1);

    setTimeout(() => {
      fetchPosts(1, filterQuery);
    }, 2000);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to continue!");
      return;
    }
    try {
      setIsLoadingPost(true);
      const jsonBlog = new Blob(
        [JSON.stringify({ content: newPost.content })],
        { type: "application/json" }
      );
      const formData = new FormData();
      formData.append("post", jsonBlog);
      if (newPost.image) {
        formData.append("file", newPost.image);
      }

      const response = await createPost(formData);
      if (response) {
        setPosts((prevPosts) => [response, ...prevPosts]);
      }
      setNewPost({ content: "", image: null });
      setShowModal(false);
      setSelectedImage(null);
      setIsLoadingPost(false);
    } catch (error) {
      setIsLoadingPost(true);
      console.error(error);
    }
  };
  const handleContentChange = (e) => {
    setNewPost({ ...newPost, content: e.target.value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      setNewPost({ ...newPost, image: file });
    }
  };
  const handleDeletePost = (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePost(postId);
          setPosts((prev) => prev.filter((post) => post.id !== postId));
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
          handleSearchPost={handleSearchPost}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        />
        <div className="main-content">
          <ModalCreatePost setShowModal={setShowModal} avatar={avatar} />
          <PostArticle
            newPost={newPost}
            showModal={showModal}
            setShowModal={setShowModal}
            handlePostSubmit={handlePostSubmit}
            handleContentChange={handleContentChange}
            handleImageChange={handleImageChange}
            selectedImage={selectedImage}
            isLoadingPost={isLoadingPost}
          />
          <PostList
            setCurrentPage={setCurrentPage}
            hasMore={hasMore}
            posts={posts}
            isSearching={isSearching}
            loading={loading}
            avatar={avatar}
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
