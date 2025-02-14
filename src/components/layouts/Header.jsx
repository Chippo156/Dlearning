import { div } from "framer-motion/client";
import { NavLink } from "react-router-dom";
import { NavigationMenu } from "../widgets/NavigationMenu";
import { useRef } from "react";
import { Favourite } from "../widgets/Favourite";

export const Header = () => {
  const underlineRef = useRef(null);
  const role = "USER";
  const points = "6";

  return (
    <div className="header-page">
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-5 py-lg-0 px-lg-5">
          <NavLink className="navbar-brand" to="/home">
            <h1 className="m-0 text-uppercase text-primary rounded">
              <i className="fa fa-book-reader mr-3"></i>CHIPPO-LEARNING
            </h1>
          </NavLink>
          <button
            type="button"
            className="navbar-toggler rounded"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between align-items-center px-lg-3 "
            id="navbarCollapse"
          >
            <NavigationMenu
              isActive={(path) => location.pathname === path}
              underlineRef={underlineRef}
            ></NavigationMenu>

            <div className="navbar-nav ml-auto d-flex align-items-center">
              <div className="nav-item d-flex align-items-center mx-3">
                <span className="points-display text-primary">
                  <i className="fa fa-coins"></i> {points}
                </span>
              </div>

              <Favourite role={role} />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
