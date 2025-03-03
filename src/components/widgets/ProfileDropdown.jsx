import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const ProfileDropdown = (props) => {
  const { avatar, isTokenValid, role, handleLogout } = props;

  const getMenuItems = () => {
    if (isTokenValid === null) {
      return [];
    }

    if (isTokenValid) {
      const items = [
        {
          key: "profile",
          label: (
            <Link
              to="/profile"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="fa-solid fa-address-card me-2"></i>Profile
            </Link>
          ),
        },
      ];

      if (role === "USER") {
        items.push({
          key: "certificates",
          label: (
            <Link
              to="/my-certificates"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="fa-solid fa-certificate me-2"></i>Certificates
            </Link>
          ),
        });
      }

      if (role === "TEACHER") {
        items.push(
          {
            key: "manager-student",
            label: (
              <Link
                to="/manager-student"
                className="dropdown-item d-flex align-items-center"
              >
                <i className="fa-solid fa-user-graduate me-2"></i>Manager
                Student
              </Link>
            ),
          },
          {
            key: "manager-courses",
            label: (
              <Link
                to="/manager-courses"
                className="dropdown-item d-flex align-items-center"
              >
                <i className="fa-solid fa-book me-2"></i>Manager
              </Link>
            ),
          }
        );
      }

      if (role === "USER" || role === "TEACHER") {
        items.push({
          key: "my-courses",
          label: (
            <Link
              to="/my-courses"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="fa-solid fa-book me-2"></i>My Courses
            </Link>
          ),
        });
      }

      if (role === "USER") {
        items.push({
          key: "register-teacher",
          label: (
            <Link
              to="/register-teacher"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="fa-solid fa-user-graduate me-2"></i>Teach Now
            </Link>
          ),
        });
      }

      if (role === "ADMIN") {
        items.push({
          key: "admin",
          label: (
            <Link
              to="/admin"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="fa-solid fa-user-tie me-2"></i>Admin
            </Link>
          ),
        });
      }

      if (role === "USER" || role === "TEACHER") {
        items.push({
          key: "deposit",
          label: (
            <Link
              to="/deposit"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="fa-brands fa-bitcoin me-2"></i>Deposit
            </Link>
          ),
        });
      }

      items.push(
        {
          key: "change-password",
          label: (
            <Link
              to="/change-password"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="fa-solid fa-key me-2"></i>Password
            </Link>
          ),
        },
        {
          key: "logout",
          label: (
            <Link
              className="dropdown-item d-flex align-items-center"
              id="login"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-sign-in-alt me-2"></i>Logout
            </Link>
          ),
        }
      );

      return items;
    }

    return [
      {
        key: "login",
        label: (
          <Link
            to="/login"
            className="dropdown-item d-flex align-items-center"
            id="login"
          >
            <i className="fa-solid fa-sign-in-alt me-2"></i>Login
          </Link>
        ),
      },
      {
        key: "register",
        label: (
          <Link
            to="/register"
            className="dropdown-item d-flex align-items-center"
            id="register"
          >
            <i className="fa-solid fa-user-plus me-2"></i>Register
          </Link>
        ),
      },
    ];
  };

  return (
    <Dropdown
      className="mx-2 nav-item"
      overlay={<Menu items={getMenuItems()} />}
    >
      {avatar ? (
        <img
          src={avatar}
          alt="User Avatar"
          style={{
            width: "10%",
            height: "80px",
            flex: 1,
            borderRadius: "50%",
            padding: "5px",
          }}
        />
      ) : (
        <Avatar icon={<UserOutlined />} />
      )}
    </Dropdown>
  );
};
