import React from "react";
import { Button } from "react-bootstrap";
import { FaCommentAlt, FaShare, FaThumbsUp } from "react-icons/fa";

export const PostFooter = ({
  handleModalOpen,
  handleAddLike,
  likeCount,
  likes,
}) => {
  return (
    <div className="post-footer d-flex justify-content-around py-2 px-3 border-top">
      <Button
        onClick={handleAddLike}
        variant="link"
        className={`post-action  text-decoration-none text-primary like-post ${
          likes ? "text-primary" : "text-secondary"
        }`}
      >
        <FaThumbsUp />
      </Button>
      <Button
        variant="link"
        className="post-action  text-decoration-none text-primary comment-post"
        onClick={handleModalOpen}
      >
        <FaCommentAlt /> Comments
      </Button>
      <Button
        variant="link"
        className="post-action  text-decoration-none text-secondary share-post"
      >
        <FaShare /> Share
      </Button>
    </div>
  );
};
