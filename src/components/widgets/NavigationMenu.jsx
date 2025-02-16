import { NavLink } from "react-router-dom";

export const NavigationMenu = ({ isActive, underlineRef }) => {
  return (
    <div className="navbar-nav gap-5 gap-sm-1 mx-auto py-0 position-relative">
      <NavLink
        to="/"
        className={`nav-item nav-link rounded hover-navbar ${
          isActive("/") ? "active" : ""
        }`}
      >
        Home
      </NavLink>
      <NavLink
        to="/certificate"
        className={`nav-item nav-link rounded hover-navbar ${
          isActive("/certificate") ? "active" : ""
        }`}
      >
        Certificate
      </NavLink>
      <NavLink
        to="/courses"
        className={`nav-item nav-link rounded hover-navbar ${
          isActive("/courses") ? "active" : ""
        }`}
      >
        Courses
      </NavLink>
      <NavLink
        to="/community"
        className={`nav-item nav-link rounded  hover-navbar ${
          isActive("/comunity") ? "active" : ""
        }`}
      >
        Community
      </NavLink>
      <NavLink
        to="/contact"
        className={`nav-item nav-link rounded hover-navbar ${
          isActive("/contact") ? "active" : ""
        }`}
      >
        Contact
      </NavLink>
      <NavLink
        to="/about"
        className={`nav-item nav-link rounded hover-navbar ${
          isActive("/about") ? "active" : ""
        }`}
      >
        About
      </NavLink>
      <div className="underline" ref={underlineRef}></div>
    </div>
  );
};
