import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const ProfileDropdown = () => {
  const widgetMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile" className="dropdown-item d-flex align-items-center">
          <i className="fa-solid fa-address-card me-2"></i>Profile
        </Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <Link
          to="/my-certificates"
          className="dropdown-item d-flex align-items-center"
        >
          <i className="fa-solid fa-certificate me-2"></i>Certificates
        </Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <Link
          to="/manager-student"
          className="dropdown-item d-flex align-items-center"
        >
          <i className="fa-solid fa-user-graduate me-2"></i>Manager Student
        </Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <Link
          to="/my-courses"
          className="dropdown-item d-flex align-items-center"
        >
          <i className="fa-solid fa-book me-2"></i>My Courses
        </Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <Link
          to="/manager-courses"
          className="dropdown-item d-flex align-items-center"
        >
          <i className="fa-solid fa-book me-2"></i>Manager
        </Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <Link
          to="/register-teacher"
          className="dropdown-item d-flex align-items-center"
        >
          <i className="fa-solid fa-user-graduate me-2"></i>Teach Now
        </Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin" className="dropdown-item d-flex align-items-center">
          <i className="fa-solid fa-user-tie me-2"></i>Admin
        </Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <Link to="/deposit" className="dropdown-item d-flex align-items-center">
          <i className="fa-brands fa-bitcoin me-2"></i>
          Deposit
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to="/change-password"
          className="dropdown-item d-flex align-items-center"
        >
          <i className="fa-solid fa-key me-2"></i>Password
        </Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <i className="fa-solid fa-sign-out-alt me-2"></i>Logout
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
  );
  return (
    <>
      <Dropdown className="mx-2 nav-item" overlay={widgetMenu}>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </>
  );
};
