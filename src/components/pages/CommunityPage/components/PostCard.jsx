import { Card, Image } from "react-bootstrap";
import avatarDefault from "../../../../img/avatar-default.jpg";
import { Button } from "antd";
import { PostFooter } from "./PostFooter";
import { PostModal } from "./PostModal";
import { useEffect, useState } from "react";
import { use } from "framer-motion/m";

export const PostCard = (props) => {
  const { post, handleDeletePost } = props;
  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState(false);
  const handleAddLike = () => {
    setLikes(!likes);
    if (likes) {
      const newLikes = post.likeCount + 1;
      post.likeCount = newLikes;
    }
    if (!likes) {
      if (post.likeCount > 0) {
        const newLikes = post.likeCount - 1;
        post.likeCount = newLikes;
      }
    }
    console.log(post.likeCount);
  };

  useEffect(() => {}, [likes]);

  return (
    <>
      <Card className="post-card">
        <Card.Header className="post-header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Image
              src={post.avatar || avatarDefault}
              roundedCircle
              width={50}
              height={50}
              className="me-3"
            />
            <div>
              <strong className="post-author">{post.name}</strong>
              <p className="text-muted mb-0 post-created">{post.createdAt}</p>
            </div>
          </div>
          {post.owner && (
            <Button
              onClick={() => handleDeletePost(post.id)}
              type="link"
              className="post-owner text-decoration-none"
            >
              <i className="fa-solid fa-trash"></i>
            </Button>
          )}
        </Card.Header>
        <Card.Body>
          <Card.Text className="post-content">{post.content}</Card.Text>
          {post.image && (
            <div className="post-image-container mb-3">
              <img src={post.image} alt="Post" className="post-image" />
            </div>
          )}
        </Card.Body>
        <PostFooter
          handleAddLike={handleAddLike}
          handleModalOpen={handleModalOpen}
          likeCount={post.likeCount}
          likes={likes}
        />
      </Card>
      <PostModal
        likes={likes}
        handleAddLike={handleAddLike}
        show={showModal}
        handleClose={handleModalClose}
        post={post}
      />
    </>
  );
};
