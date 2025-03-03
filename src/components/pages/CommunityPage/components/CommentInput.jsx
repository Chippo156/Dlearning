import { Button, Form, Image } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { FaCamera, FaPaperPlane, FaSmile } from "react-icons/fa";
import { MdGif } from "react-icons/md";
import avatarDefault from "../../../../img/avatar-default.jpg";

export const CommentInput = ({
  avatar,
  commentContent,
  setCommentContent,
  handleAddComment,
}) => {
  return (
    <div className="d-flex align-items-center mt-3 rounded-2 shadow-sm">
      <Image
        src={avatar || avatarDefault}
        roundedCircle
        width={30}
        height={30}
        className="me-3 shadow-sm"
      />
      <Form.Control
        type="text"
        placeholder="Please leave a comment..."
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        className="shadow-sm flex-grow-1 me-2"
      />
      <div className="post-icon-container d-flex align-items-center">
        <FaSmile
          size={20}
          className="post-icon me-2 text-warning"
          title="Add an emoji"
        />
        <BsFillImageFill
          size={20}
          className="post-icon me-2 text-success"
          title="Add an image"
        />
        <MdGif
          size={22}
          className="post-icon me-2 text-info"
          title="Add a GIF"
        />
        <FaCamera
          size={20}
          className="post-icon me-2 text-primary"
          title="Send a photo"
        />
      </div>

      <Button variant="link" className="p-0 text-primary  text-decoration-none">
        <FaPaperPlane size={24} onClick={handleAddComment} />
      </Button>
    </div>
  );
};
