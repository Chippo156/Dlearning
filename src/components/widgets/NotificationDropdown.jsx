import { Avatar, Badge, Image } from "antd";
import moment from "moment";

export const NotificationDropdown = ({
  notifications = [],
  unreadCount,
  markAsRead,
}) => {
  const timeAgo = (createAt) => {
    return moment(createAt).fromNow();
  };
  return (
    <div className="nav-item dropdown mx-2 position-relative">
      <button
        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center position-relative"
        data-bs-toggle="dropdown"
        style={{ width: "40px", height: "40px" }}
      >
        <Badge count={unreadCount} overflowCount={99}>
          {" "}
          <i className="fa-solid fa-bell " style={{ width: 40 }}></i>
        </Badge>
      </button>
      <ul className="dropdown-menu dropdown-menu-end p-3 notification-dropdown shadow-lg">
        {notifications.length === 0 ? (
          <li className="dropdown-item text-center text-muted">
            No new notifications
          </li>
        ) : (
          notifications.map((n) => (
            <li
              style={{ padding: "10px 0", borderBottom: "1px solid #ddd" }}
              key={n.id}
              className={`notification-item ${n.isRead ? "read" : "unread"}`}
            >
              <Image
                src={
                  n.avatar ||
                  "https://bootdey.com/img/Content/avatar/avatar7.png"
                }
                alt="Sender Avatar"
                width={40}
                height={40}
                preview={false}
                className="rounded-circle me-3"
              />
              <div>
                <h6 style={{ color: "InfoText" }}>{n.username}</h6>
                <div style={{ fontWeight: n.isRead ? "normal" : "600" }}>
                  {n.title}
                </div>
                <small className="text-muted d-block mb-1">
                  {timeAgo(n.createdAt)}
                </small>
                {n.isRead ? (
                  <div></div>
                ) : (
                  <button
                    className="btn btn-sm btn-link"
                    onClick={() => markAsRead(n.id)}
                  >
                    <i className="fa fa-check-circle"></i> Mark as read
                  </button>
                )}
              </div>
              {n.isRead && (
                <i className="fa fa-check-circle text-success ms-auto"></i>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
