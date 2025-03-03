import { Button, Form, Modal } from "react-bootstrap";
import {
  FaImage,
  FaMapMarkerAlt,
  FaRegGrinAlt,
  FaSmile,
  FaUserFriends,
} from "react-icons/fa";
import { MdGif } from "react-icons/md";
import { ClipLoader } from "react-spinners";

export const PostArticle = (props) => {
  const {
    showModal,
    setShowModal,
    handlePostSubmit,
    newPost,
    handleContentChange,
    handleImageChange,
    selectedImage,
    isLoadingPost,
  } = props;
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      className="modal-show"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create a New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlePostSubmit}>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="What's on your mind?"
              value={newPost.content}
              onChange={handleContentChange}
              disabled={isLoadingPost}
            />
          </Form.Group>

          <div className="d-flex align-items-center justify-content-between my-3 icon-toolbar">
            <span className="text-secondary">Add to your post</span>
            <div className="icon-container d-flex">
              <label htmlFor="image-upload" className="icon-label me-3">
                <FaImage size={24} className="text-success" />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  disabled={isLoadingPost}
                />
              </label>
              <FaUserFriends size={24} className="icon me-3 text-primary" />
              <FaSmile size={24} className="icon me-3 text-warning" />
              <FaMapMarkerAlt size={24} className="icon me-3 text-danger" />
              <MdGif size={24} className="icon me-3 text-info" />
              <FaRegGrinAlt size={24} className="icon text-secondary" />
            </div>
          </div>

          {selectedImage && (
            <div className="mt-3">
              <img
                src={selectedImage}
                alt="Selected Preview"
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  borderRadius: "10px",
                }}
              />
            </div>
          )}

          <Button
            className="mt-3 btn-block btn-port btn-primary"
            type="submit"
            size="lg"
            disabled={isLoadingPost}
          >
            {isLoadingPost ? (
              <>
                <ClipLoader color="#fff" size={20} />
                <span className="ms-2">Posting...</span>
              </>
            ) : (
              "Post"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
