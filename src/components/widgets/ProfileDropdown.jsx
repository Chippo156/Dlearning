import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const ProfileDropdown = (props) => {
  const { avatar, isTokenValid, role, handleLogout } = props;
  const widgetMenu =
    isTokenValid === null ? (
      <Menu></Menu>
    ) : isTokenValid ? (
      <Menu key={role}>
        <Menu.Item>
          <Link
            to="/profile"
            className="dropdown-item d-flex align-items-center"
          >
            <i className="fa-solid fa-address-card me-2"></i>Profile
          </Link>{" "}
        </Menu.Item>
        {role === "USER" && (
          <Menu.Item>
            <Link
              to="/my-certificates"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="fa-solid fa-certificate me-2"></i>Certificates
            </Link>{" "}
          </Menu.Item>
        )}
        {role === "TEACHER" && (
          <Menu.Item>
            <Link
              to="/manager-student"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="fa-solid fa-user-graduate me-2"></i>Manager Student
            </Link>{" "}
          </Menu.Item>
        )}
        {role === "TEACHER" ||
          (role === "USER" && (
            <Menu.Item>
              <Link
                to="/my-courses"
                className="dropdown-item d-flex align-items-center"
              >
                <i className="fa-solid fa-book me-2"></i>My Courses
              </Link>{" "}
            </Menu.Item>
          ))}
        {role === "TEACHER" && (
          <Menu.Item>
            <Link
              to="/manager-courses"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="fa-solid fa-book me-2"></i>Manager
            </Link>{" "}
          </Menu.Item>
        )}
        {role === "USER" && (
          <Menu.Item>
            <Link
              to="/register-teacher"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="fa-solid fa-user-graduate me-2"></i>Teach Now
            </Link>{" "}
          </Menu.Item>
        )}
        {role === "ADMIN" && (
          <Menu.Item>
            <Link
              to="/admin"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="fa-solid fa-user-tie me-2"></i>Admin
            </Link>{" "}
          </Menu.Item>
        )}
        {(role === "USER" || role === "TEACHER") && (
          <Menu.Item>
            <Link
              to="/deposit"
              className="dropdown-item d-flex align-items-center"
            >
              <i className="fa-brands fa-bitcoin me-2"></i>
              Deposit
            </Link>
          </Menu.Item>
        )}
        <Menu.Item>
          <Link
            to="/change-password"
            className="dropdown-item d-flex align-items-center"
          >
            <i className="fa-solid fa-key me-2"></i>Password
          </Link>{" "}
        </Menu.Item>
        <Menu.Item>
          <Link
            className="dropdown-item d-flex align-items-center"
            id="login"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-sign-in-alt me-2"></i>Logout
          </Link>{" "}
        </Menu.Item>
        <Menu.Item>
          <Link
            to="/login"
            className="dropdown-item d-flex align-items-center"
            id="login"
          >
            <i className="fa-solid fa-sign-in-alt me-2"></i>Login
          </Link>{" "}
        </Menu.Item>
      </Menu>
    ) : (
      <Menu key={role}>
        <Menu.Item>
          <Link
            to="/login"
            className="dropdown-item d-flex align-items-center"
            id="login"
          >
            <i className="fa-solid fa-sign-in-alt me-2"></i>Login
          </Link>{" "}
        </Menu.Item>
        <Menu.Item>
          <Link
            to="/register"
            className="dropdown-item d-flex align-items-center"
            id="register"
          >
            <i className="fa-solid fa-user-plus me-2"></i>Register
          </Link>{" "}
        </Menu.Item>
      </Menu>
    );

  return (
    <>
      <Dropdown className="mx-2 nav-item" overlay={widgetMenu}>
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
    </>
  );
};
