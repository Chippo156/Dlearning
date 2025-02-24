import { use, useEffect, useRef } from "react";
import { RiEmotionNormalFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { getChapterById } from "../../../service/CourseService";
import { toast, ToastContainer } from "react-toastify";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import {
  getCompletionPercentage,
  markLessonAsCompleted,
} from "../../../service/LessonProgressService";
import { ProgressBar } from "./components/ProgressBar";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import {
  checkPurchase,
  isCompleteCourse,
} from "../../../service/EnrollmentService";
import { CongratulationsModal } from "./components/CongratulationModal";
import { getAvatar, myInfo } from "../../../service/UserSevice";
import axios from "axios";
import {
  addCommentLesson,
  getAllReviewsLesson,
} from "../../../service/ReviewService";
import { ReviewLesson } from "./components/ReviewLesson";
import { Prev } from "react-bootstrap/esm/PageItem";

export const LearningPage = () => {
  useEffect(() => {
    document.title = "Learning";
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [totalLesson, setTotalLesson] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [chapters, setChapters] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({});
  const [completedLessons, setCompletedLessons] = useState([]);
  const videoRef = useRef(null);
  const [hasUpdatedCompletion, setHasUpdatedCompletion] = useState(false);
  const [lastTime, setLastTime] = useState(0);
  const [showModalComplete, setShowModelComplete] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [commentLesson, setCommentLesson] = useState([]);
  const [newCommentLesson, setNewCommentLesson] = useState("");
  const [replyContent, setReplyContent] = useState({});

  const [activeReply, setActiveReply] = useState(null);

  const [completionData, setCompletionData] = useState({
    totalLessonComplete: 0,
    totalLessons: 0,
    completionPercentage: 0,
  });

  // Lấy thông tin user hiện tại
  useEffect(() => {
    myInfo()
      .then((response) => {
        setUsername(response.data.firstName + " " + response.data.lastName);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    getAvatar()
      .then((response) => {
        setAvatar(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  // Xử lý khi thay đổi bài học hiện tại
  useEffect(() => {
    setHasUpdatedCompletion(false);
  }, [currentLesson]);

  // Xử lý khi video seek
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Xử lý khi seek video nhanh
      const handleSeeking = () => {
        if (video.currentTime > lastTime) {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Fast forwarding is not allowed.",
            confirmButtonText: "OK",
          });
          video.currentTime = lastTime; // Set the current time back to the last time
        }
      };
      // Xử lý khi video time update
      const handleTimeUpdate = async () => {
        setLastTime(video.currentTime);
        if (
          video.currentTime / video.duration >= 0.8 &&
          !hasUpdatedCompletion
        ) {
          setHasUpdatedCompletion(true);
          await markLessonAsCompleted(currentLesson.lessonId);
          setCompletedLessons((prev) => [...prev, currentLesson.lessonId]);

          setCompletionData((prev) => {
            const newCompletionData = {
              ...prev,
              totalLessonComplete: prev.totalLessonComplete + 1,
              completionPercentage: Math.round(
                ((prev.totalLessonComplete + 1) / totalLesson) * 100
              ),
            };
            console.log("Updated completion data:", newCompletionData);

            return newCompletionData;
          });
        }
      };
      video.addEventListener("seeking", handleSeeking);
      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        video.removeEventListener("seeking", handleSeeking);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [currentLesson, hasUpdatedCompletion, lastTime, totalLesson]);

  // check đã mua khoá học chưa
  useEffect(() => {
    const fetchCheckPurchase = async () => {
      try {
        const result = await checkPurchase(id);
        if (result && result.data) {
          if (!result.data.purchased) {
            navigate("/home");
          }
        }
      } catch (error) {
        console.error("Error during check purchase:", error);
        toast.error("Error during check purchase");
        navigate("/home");
      }
    };
    if (id) {
      fetchCheckPurchase();
    }
  }, [id, navigate]);

  // Lấy dữ liệu bài học theo id
  useEffect(() => {
    const fetchLessonByCourseId = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await getChapterById(id);
        console.log("Data:", data);

        setCourseTitle(data.data.courseTitle);
        const chaptersData = data.data.chapters || [];
        setChapters(chaptersData);
        setTotalLesson(data.data.totalLesson);
        if (chaptersData.length > 0) {
          const firstLesson =
            chaptersData[0].lessonDto && chaptersData[0].lessonDto[0];
          if (firstLesson) {
            setCurrentLesson(firstLesson);
            setCurrentChapter({ chapterId: chaptersData[0].chapterId });
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error during fetch lesson by course id:", error);
        toast.error("Error during fetch lesson by course id");
      } finally {
        setLoading(false);
      }
    };
    fetchLessonByCourseId();
  }, [token]);

  // Tính toán dữ liệu hoàn thành khóa học
  useEffect(() => {
    const calculateCompletionData = async () => {
      try {
        const data = await getCompletionPercentage(id);
        setCompletionData({
          totalLessonComplete: data.data.totalLessonComplete,
          totalLessons: data.data.totalLessons,
          completionPercentage: data.data.completionPercentage,
        });
        const completedLessonIds = data.data.lessonCompletes.map(
          (lesson) => lesson.lessonId
        );
        setCompletedLessons(completedLessonIds);
      } catch (error) {
        console.error("Error during calculate completion data:", error);
        toast.error("Error during calculate completion data");
      }
    };
    calculateCompletionData();
  }, [id]);

  useEffect(() => {
    if (completionData.totalLessonComplete === totalLesson) {
      const checkCourseCompletion = async () => {
        const result = await isCompleteCourse(id);
        console.log("Check course completion result:", result);

        if (result && result.data && result.data.isComplete === true) {
          Swal.fire({
            icon: "success",
            title: "Congratulations!",
            text: "You have completed the course!",
            confirmButtonText: "OK",
          });
          setShowModelComplete(true);
          navigate("/home");
        }
      };
      checkCourseCompletion();
    }
  }, [completionData.totalLessonComplete, totalLesson, id]);

  // Xử lý hiển thị menu bài học
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items2 = chapters.map((chapter, index) => {
    const key = `sub${index + 1}`;
    return {
      key,
      label: `${chapter.chapterName}`,
      children: chapter.lessonDto.map((lesson) => ({
        key: `${lesson.lessonId}`,
        label: `${lesson.lessonName}`,
      })),
    };
  });

  // Xử lý khi click vào menu bài học
  const handleMenuClick = (e) => {
    const selectedLesson = chapters
      .flatMap((chapter) => chapter.lessonDto)
      .find((lesson) => String(lesson.lessonId) === e.key);

    if (selectedLesson) {
      setCurrentLesson(selectedLesson);
    }
  };
  //
  const fetchReviewLesson = async (lessonId) => {
    if (!lessonId) {
      return;
    }
    try {
      const response = await getAllReviewsLesson(lessonId);
      if (response.data) {
        setCommentLesson(response.data || []);
        console.log("====================================");
        console.log(response.data);
        console.log("====================================");
      } else {
        toast.error("Error during fetch review lesson");
      }
    } catch (error) {
      console.error("Error during fetch review lesson:", error);
      toast.error("Error during fetch review lesson");
    }
  };
  useEffect(() => {
    if (currentLesson && currentLesson.lessonId) {
      fetchReviewLesson(currentLesson.lessonId);
    }
  }, [currentLesson]);

  //handle add comment lesson
  const handleAddcommentLesson = async () => {
    if (!newCommentLesson.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    if (!currentLesson) {
      toast.error("No lesson selected");
      return;
    }
    const commentData = {
      courseId: id,
      lessonId: currentLesson.lessonId,
      chapterId: currentChapter.chapterId,
      content: newCommentLesson,
      parentReviewId: null,
    };
    try {
      const response = await addCommentLesson(commentData);
      if (response.data && response) {
        setCommentLesson((prev) => [
          {
            ...response.data,
            replies: [],
          },
          ...prev,
        ]);
        toast.success("Comment added successfully");
        setNewCommentLesson("");
      } else {
        toast.error("Error during add comment lesson");
        console.error("Error during add comment lesson:", error);
      }
    } catch (error) {
      toast.error("Error during add comment lesson");
      console.error("Error during add comment lesson:", error);
    }
  };
  const handleNewCommentChange = (e) => {
    setNewCommentLesson(e.target.value);
  };
  const toggleReplyInput = (id) => {
    setActiveReply(activeReply === id ? null : id);
  };

  const handleReplyChange = (id, value) => {
    setReplyContent((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleReplySubmit = async (commentId) => {
    if (!replyContent[commentId]?.trim()) {
      return;
    }
    const commentData = {
      courseId: id,
      lessonId: currentLesson.lessonId,
      chapterId: currentChapter.chapterId,
      content: replyContent[commentId],
      parentReviewId: commentId,
    };
    try {
      const response = await addCommentLesson(commentData);
      if (response && response.data) {
        setCommentLesson((prevComments) =>
          prevComments.map((comment) => {
            console.log(comment.id, commentId);

            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...comment.replies, response.data],
              };
            }
            return comment;
          })
        );
        toast.success("Reply added successfully");
        setReplyContent((prev) => ({
          ...prev,
          [id]: "",
        }));
        setActiveReply(null);
      } else {
        toast.error("Error during add reply");
      }
    } catch (error) {
      console.error("Error during add reply:", error);
      toast.error("Error during add reply");
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  const handleCloseModal = () => {
    setShowModelComplete(!showModalComplete);
  };

  return (
    <div>
      <ProgressBar courseTitle={courseTitle} completionData={completionData} />
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
            onClick={handleMenuClick}
            selectedKeys={[String(currentLesson?.lessonId)]}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {showModalComplete && (
              <div className="modal-overlay">
                <CongratulationsModal
                  onClose={handleCloseModal}
                  avatar={avatar}
                  username={username}
                />
              </div>
            )}
            <video
              ref={videoRef}
              key={currentLesson?.videoUrl}
              width="100%"
              height={650}
              controls
            >
              <source src={currentLesson?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <ReviewLesson
              handleAddCommentLesson={handleAddcommentLesson}
              handleNewCommentChange={handleNewCommentChange}
              newCommentLesson={newCommentLesson}
              replyContent={replyContent}
              handleReplyChange={handleReplyChange}
              avatar={avatar}
              comments={commentLesson}
              toggleReplyInput={toggleReplyInput}
              activeReply={activeReply}
              handleReplySubmit={handleReplySubmit}
            />
          </Content>
        </Layout>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        className="custom-toast-container"
      />
    </div>
  );
};
