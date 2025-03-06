import { NavLink, useLocation } from "react-router-dom";
import { NavigationMenu } from "../widgets/NavigationMenu";
import { use, useContext, useEffect, useRef, useState } from "react";
import { Favourite } from "../widgets/Favourite";
import { motion } from "framer-motion";
import { ProfileDropdown } from "../widgets/ProfileDropdown";
import { HandleLogout } from "../../service/OAuth2/HandleLogout";
import AuthContext from "../../context/AuthContext";
import { useUserProfile } from "../../hooks/useUserProfile";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { useAuthData } from "../../hooks/useAuthData";
import { NotificationDropdown } from "../widgets/NotificationDropdown";
import { useNotification } from "../../hooks/useNotification";
import { useWebSocket } from "../../router/useWebSocket";
export const Header = () => {
  const wsClient = useWebSocket();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const { handleLogout } = HandleLogout();
  const { role, loading: roleLoading } = useAuthData();
  const { avatar, points, loading: profileLoading } = useUserProfile();
  const {
    notifications,
    unreadCount,
    markAsRead,
    loading: notificationLoading,
  } = useNotification(wsClient);

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      authContext.refresh();
    }
  }, []);

  const loading = profileLoading || roleLoading || notificationLoading;
  const underlineRef = useRef(null);

  if (roleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="header-page">
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-lg-2 px-lg-5">
          <NavLink className="navbar-brand" to="/home">
            <div className="m-0 text-uppercase text-primary rounded">
              <motion.h1
                initial={{ y: -250 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              >
                {" "}
                <i className="fa fa-book-reader mr-3"></i> Chippo Learning
              </motion.h1>
            </div>
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
            ></NavigationMenu>

            <div className="navbar-nav ml-auto d-flex align-items-center gap-4">
              <div className="nav-item d-flex align-items-center">
                <span className="points-display text-primary">
                  <i className="fa fa-coins"></i> {points}
                </span>
              </div>
              <NotificationDropdown
                notifications={notifications}
                unreadCount={unreadCount}
                markAsRead={markAsRead}
              />
              <Favourite role={role} />
              <ProfileDropdown
                isTokenValid={authContext.authenticated}
                handleLogout={handleLogout}
                avatar={avatar}
                role={role}
              />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
