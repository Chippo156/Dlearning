import { Outlet } from "react-router-dom";
import { Footer } from "../components/layouts/Footer";
import { Header } from "../components/layouts/Header";
import { TopBar } from "../components/layouts/TopBar";

export const HeaderAndFooterRoute = () => {
  return (
    <div>
      <TopBar></TopBar>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};
