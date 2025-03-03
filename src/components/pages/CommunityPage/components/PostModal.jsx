import {
  Button,
  Dropdown,
  Form,
  ListGroup,
  Modal,
  Spinner,
} from "react-bootstrap";
import { PostHeader } from "./PostHeader";
import { useEffect, useState } from "react";
import { PostFooter } from "./PostFooter";
import { PostContent } from "./PostContent";
import { Image } from "antd";
import avatarDefault from "../../../../img/avatar-default.jpg";
import moment from "moment";
import { getAvatar } from "../../../../service/UserSevice";
import { FaEllipsisH, FaThumbsUp } from "react-icons/fa";
import { CommentInput } from "./CommentInput";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../../../../service/CommentService";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

export const PostModal = ({
  show,
  handleClose,
  post,
  handleAddLike,
  likes,
}) => {
  const [comment, setComment] = useState([]);
  const postId = post?.id;
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [avatar, setAvatar] = useState("");
  const [replyStatus, setReplyStatus] = useState("");
  const [replyContent, setReplyContent] = useState({});

  const timeAgo = (createdAt) => {
    return moment(createdAt).fromNow();
  };
  useEffect(() => {
    if (!token) return;
    getAvatar()
      .then((data) => setAvatar(data.result))
      .catch((error) => console.log(error));
  });
  const toggleDropdown = (commentId) => {
    setActiveDropdownId((prevId) => (prevId === commentId ? null : commentId));
  };
  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditContent((prev) => ({
      ...prev,
      [commentId]: content,
    }));
  };

  const handleSaveEdit = async (commentId) => {
    const updatedContent = (editContent[commentId] || "").trim();
    if (!updatedContent) {
      toast.error("Comment content cannot be empty");
      return;
    }
    try {
      const result = await updateComment(commentId, updatedContent);
      if (result) {
        setComment((prev) => {
          // Bước 1: Tạo một danh sách comments mới bằng cách map qua các bình luận cũ.

          const updateComments = prev.map((cmt) => {
            // Bước 2: Nếu commentId trùng với id của comment hiện tại thì cập nhật nội dung mới.
            if (cmt.id === commentId) {
              return {
                ...cmt,
                content: updatedContent,
              };
            }
            // Nếu không phải bình luận cha thì tiếp tục map qua các bình luận con.
            const updateReplies = cmt.replies.map((reply) => {
              // Nếu commentId trùng với id của comment hiện tại thì cập nhật nội dung mới.
              if (reply.id === commentId) {
                return {
                  ...reply,
                  content: updatedContent,
                };
              }
              // Trả về bình luận cũ nếu không phải bình luận cần chỉnh sửa.
              return reply;
            });
            // Trả về bình luận cũ nếu không phải bình luận cần chỉnh sửa.
            return {
              ...cmt,
              replies: updateReplies,
            };
          });
          // Trả về danh sách bình luận mới.
          return [...updateComments];
        });
        setEditingCommentId(null);
        setEditContent("");
      }
    } catch (error) {
      console.error("Error updating comment: ", error);
    }
  };

  const handleReplyToggle = (commentId) => {
    setReplyStatus((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleCreateComment = async () => {
    if (!commentContent.trim()) {
      toast.error("Comment content cannot be empty");
      return;
    }

    const commentData = {
      content: commentContent.trim(),
      postId: postId,
      parentCommentId: null,
    };
    try {
      const response = await createComment(commentData);
      setCommentContent("");
      console.log(response);

      if (response) {
        setComment([
          ...comment,
          {
            ...response.data,
            replying: false,
            replies: [],
          },
        ]);
        console.log("Comment created successfully");
      }
    } catch (error) {
      console.error("Error creating comment: ", error);
    }
  };

  const handleReplyComment = async (commentId) => {
    const replyText = replyContent[commentId] || "";
    if (!replyText.trim()) {
      toast.error("Comment content cannot be empty");
      return;
    }

    const commentData = {
      content: replyText.trim(),
      postId: postId,
      parentCommentId: commentId,
    };

    console.log(commentData);

    try {
      const response = await createComment(commentData);
      console.log(response.data);
      if (response) {
        const updatedComments = comment.map((cmt) => {
          if (cmt.id === commentId) {
            return {
              ...cmt,
              replies: [...cmt.replies, { ...response.data, replying: false }],
            };
          }
          return cmt;
        });
        setComment(updatedComments);
        setReplyContent({
          ...replyContent,
          [commentId]: "",
        });
      }
    } catch (error) {
      console.error("Error creating comment: ", error);
    }
  };

  useEffect(() => {
    if (!token || !postId) {
      return;
    }
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await getComments(postId, currentPage);
        const updatedComments = data.result.map((cmt) => ({
          ...cmt,
          replying: false,
          replies: cmt.replies || [],
        }));

        if (currentPage === 1) {
          setComment(updatedComments);
        } else {
          setComment((prev) => [...prev, ...updatedComments]);
        }
        if (data.result.length < 4) {
          setHasMoreComments(false);
        }
      } catch (error) {
        console.error("Error getting comments: ", error);
      }
    };
    fetchComments();
  }, [postId, token, currentPage]);

  const handleDeleteComment = async (commentId) => {
    if (!token || !commentId) {
      return;
    }
    try {
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
          const response = await deleteComment(commentId);
          if (response) {
            const updatedComments = comment.filter(
              (cmt) => cmt.id !== commentId
            );
            setComment(updatedComments);
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete comment",
              icon: "error",
              width: "370px",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="post-modal">
      <Modal.Body className="post-modal-body">
        <PostHeader
          avatar={post.avatar}
          createdAt={post.createdAt}
          author={post.name}
        />
        <PostContent image={post.image} content={post.content} />
        <PostFooter handleAddLike={handleAddLike} likes={likes} />
        <ListGroup className="post-modal-comments">
          {comment.map((cmt) => (
            <ListGroup.Item key={cmt.id} className="post-comment-item">
              <div className="d-flex align-items-start">
                <Image
                  src={avatarDefault}
                  width={30}
                  height={30}
                  className="me-3"
                />
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="mx-2">
                      <strong>{cmt.name}</strong>{" "}
                      <span className="text-muted">
                        {timeAgo(cmt.createdAt)}
                      </span>
                    </div>
                    <Dropdown
                      show={activeDropdownId === cmt.id}
                      onToggle={() => toggleDropdown(cmt.id)}
                      className="ms-auto"
                    >
                      <Dropdown.Toggle
                        as="button"
                        className="post-dropdown-toggle"
                      >
                        <FaEllipsisH />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="post-dropdown-menu">
                        <Dropdown.Item
                          onClick={() => handleEditComment(cmt.id, cmt.content)}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDeleteComment(cmt.id)}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  {editingCommentId === cmt.id ? (
                    <div>
                      <Form.Control
                        as="textarea"
                        value={editContent[cmt.id] || ""}
                        onChange={(e) =>
                          setEditContent({
                            ...editContent,
                            [cmt.id]: e.target.value,
                          })
                        }
                        className="my-2"
                      ></Form.Control>
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleSaveEdit(cmt.id)}
                      >
                        Save
                      </Button>
                      <Button size="sm" variant="secondary">
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <p className="mb-1">{cmt.content}</p>
                  )}
                  <div className="d-flex align-items-center">
                    <Button
                      variant="link"
                      size="sm"
                      className="text-primary p-0 me-3 text-decoration-none"
                    >
                      {" "}
                      <FaThumbsUp /> {cmt.likes} Likes
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-primary p-0 text-reply text-decoration-none"
                      onClick={() => handleReplyToggle(cmt.id)}
                    >
                      <strong>Reply</strong>
                    </Button>
                  </div>
                  {cmt.replies.length > 0 && cmt.replies && (
                    <div className="mx-4 mt-4 replies-container">
                      {cmt.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="reply-item d-flex align-items-start mt-2"
                        >
                          <Image
                            src={reply.avatar}
                            width={25}
                            height={25}
                            className="me-2 rounded-circle"
                          />
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="mx-2">
                                <strong>{reply.name}</strong>
                                <span className="text-muted">
                                  {" "}
                                  - {timeAgo(reply.createdAt)}
                                </span>
                              </div>
                              <Dropdown
                                show={activeDropdownId === reply.id}
                                onToggle={() => toggleDropdown(reply.id)}
                                className="ms-auto"
                              >
                                <Dropdown.Toggle
                                  as="button"
                                  className="post-dropdown-toggle"
                                >
                                  <FaEllipsisH />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="post-dropdown-menu">
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleEditComment(reply.id, reply.content)
                                    }
                                  >
                                    Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleDeleteComment(reply.id)
                                    }
                                  >
                                    Delete
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>

                            {/* Hiển thị nội dung comment con */}
                            {editingCommentId === reply.id ? (
                              <div>
                                <Form.Control
                                  as="textarea"
                                  value={editContent[reply.id] || ""} // Hiển thị đúng nội dung cho comment theo commentId
                                  onChange={(e) =>
                                    setEditContent({
                                      ...editContent,
                                      [reply.id]: e.target.value,
                                    })
                                  } // Cập nhật nội dung chỉnh sửa theo commentId
                                  className="my-2"
                                />
                                <Button
                                  variant="primary"
                                  className="save-comment"
                                  onClick={() => handleSaveEdit(reply.id)}
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="secondary"
                                  className="cancel-comment"
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <p className="mb-1">{reply.content}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {replyStatus[cmt.id] && (
                    <div className="reply-form">
                      <Form.Control
                        as="textarea"
                        placeholder="Write a reply..."
                        className="my-2"
                        value={replyContent[cmt.id] || ""}
                        onChange={(e) =>
                          setReplyContent({
                            ...replyContent,
                            [cmt.id]: e.target.value,
                          })
                        }
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleReplyComment(cmt.id)}
                      >
                        Reply
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </ListGroup.Item>
          ))}
          {hasMoreComments && (
            <div className="d-flex justify-content-center py-3 see-more-comment">
              <Button
                variant="outline-primary"
                size="sm"
                className="post-load-more-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Loading...
                  </>
                ) : (
                  "See more comments ..."
                )}
              </Button>
            </div>
          )}
        </ListGroup>
        <CommentInput
          setCommentContent={setCommentContent}
          avatar={avatar}
          handleAddComment={handleCreateComment}
        />
      </Modal.Body>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ top: "20%", right: "20px" }}
      />
    </Modal>
  );
};
