import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export const ReviewLesson = (props) => {
  const {
    comments,
    handleAddCommentLesson,
    newCommentLesson,
    handleReplyChange,
    handleReplySubmit,
    replyContent,
    handleNewCommentChange,
    toggleReplyInput,
    activeReply,
    avatar,
  } = props;

  const renderComments = (commentList, depth = 0) => {
    return commentList.map((comment) => (
      <div
        key={comment.id}
        className={`comment-lesson-container depth-${depth}`}
      >
        <div className="comment-lesson-avatar">
          <img
            src={avatar}
            alt="User Avatar"
            className="comment-lesson-avatar-img"
          />
        </div>
        <div className="comment-lesson-content">
          <div className="comment-lesson-name">{comment.name}</div>
          <div className="comment-lesson-text">{comment.content}</div>
          <div className="comment-lesson-actions">
            <span onClick={() => toggleReplyInput(comment.id)}>Reply</span>
          </div>
          {activeReply === comment.id && (
            <div className="comment-lesson-reply-input-wrapper">
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyContent[comment.id] || ""}
                onChange={(e) => handleReplyChange(comment.id, e.target.value)}
              />
              <button
                className="comment-lesson-submit-reply"
                onClick={() =>
                  handleReplySubmit(comment.id, replyContent[comment.id])
                }
              >
                <FaPaperPlane />
              </button>
            </div>
          )}
          {comment.replies && comment.replies.length > 0 && (
            <div className="comment-lesson-replies">
              {renderComments(comment.replies, depth + 1)}
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="comment-lesson-container">
        <div className="comment-lesson-avatar">
          <img
            src={avatar}
            alt="User Avatar"
            className="comment-lesson-avatar-img"
          />
        </div>
        <div className="comment-lesson-input-wrapper">
          <input
            type="text"
            className="comment-lesson-input"
            value={newCommentLesson}
            onChange={handleNewCommentChange}
            placeholder="Enter your new comment"
          />
        </div>
        <button
          className="comment-lesson-submit"
          onClick={() => handleAddCommentLesson(newCommentLesson)}
        >
          <FaPaperPlane />
        </button>
      </div>
      {comments && comments.length > 0 ? (
        renderComments(comments)
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};
