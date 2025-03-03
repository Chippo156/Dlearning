import { Image } from "antd";
import avatarDefault from "../../../../img/avatar-default.jpg";
export const PostHeader = ({ avatar, author, createdAt }) => {
  return (
    <div className="d-flex align-items-center p-3">
      <Image
        src={avatar || avatarDefault}
        width={40}
        height={40}
        className="me-3 rounded-circle"
      />
      <div className="d-flex flex-column gap-1 mx-2">
        <strong>{author}</strong>
        <p className="text-muted mb-0" style={{ fontSize: "0.85em" }}>
          {createdAt}
        </p>
      </div>
    </div>
  );
};
