import { Button, Image } from "antd";
import avatarDefault from "../../../../img/avatar-default.jpg";
import { Form } from "react-bootstrap";
import { FaImage, FaSmile, FaVideo } from "react-icons/fa";

export const ModalCreatePost = (props) => {
  const { setShowModal, avatar } = props;

  return (
    <div className="create-post-container">
      <div className="gap-2 create-post-header d-flex justify-content-center">
        <Image
          width={40}
          height={40}
          className="avatar-img"
          src={avatar || avatarDefault}
          alt="avatar"
        />
        <Form.Control
          type="text"
          placeholder="What's on your mind?"
          className="create-post-input"
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="create-post-footer gap-2 d-flex justify-content-around mt-3">
        <Button variant="outline-danger" className="d-flex align-items-center">
          <FaVideo className="me-1" />
          Live Video
        </Button>
        <Button variant="outline-success" className="d-flex align-items-center">
          <FaImage className="me-1" />
          Photo/Video
        </Button>
        <Button variant="outline-warning" className="d-flex align-items-center">
          <FaSmile className="me-1" />
          Feeling/Activity
        </Button>
      </div>
    </div>
  );
};
