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

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage></HomePage>}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
      </Route>
      <Route element={<HeaderAndFooterRoute />}>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      </Route>
      <Route path="/accessdenied" element={<AccessDenied />}></Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
