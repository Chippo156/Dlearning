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

function App() {
  return (
    <Routes>
      <Route element={<HeaderAndFooterRoute />}>
        <Route path="/" element={<RegisterPage></RegisterPage>}></Route>

        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        {/* <Route path="/" element={<HomePage></HomePage>}></Route> */}
      </Route>
    </Routes>
  );
}

export default App;
