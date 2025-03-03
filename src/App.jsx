import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/layouts/Footer";
import { HeaderAndFooterRoute } from "./router/HeaderAndFooterRoute";
import { LoginPage } from "./components/pages/LoginPage/LoginPage";
import { HomePage } from "./components/pages/HomePage/HomePage";
import { RegisterPage } from "./components/pages/RegisterPage/RegisterPage";
import { MainLayout } from "./router/MainLayout";
import { AboutPage } from "./components/pages/AboutPage/AboutPage";
import AccessDenied from "./components/pages/ErrorPage/AccessDenied";
import { NotFound } from "./components/pages/ErrorPage/NotFound";
import { CoursePage } from "./components/pages/CoursePage/CoursePage";
import { CourseDetailPage } from "./components/pages/CourseDetailPage/CourseDetailPage";
import { LearningPage } from "./components/pages/LearningPage/LearningPage";
import { ProfilePage } from "./components/pages/ProfilePage/ProfilePage";
import { ForgotPassword } from "./components/pages/LoginPage/components/ForgotPassword";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "./utils/LoadingSpinner";
import { CommunityPage } from "./components/pages/CommunityPage/CommunityPage";
import { MyPost } from "./components/pages/CommunityPage/MyPost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage></HomePage>}></Route>
          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/course-detail/:id" element={<CourseDetailPage />} />
        </Route>
        <Route element={<HeaderAndFooterRoute />}>
          <Route path="/courses" element={<CoursePage />}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/my-post" element={<MyPost />} />
        </Route>
        <Route path="/accessdenied" element={<AccessDenied />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
        <Route path="/lesson-detail/:id" element={<LearningPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </>
  );
}

export default App;
