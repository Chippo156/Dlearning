import { Outlet } from "react-router-dom";
import { Footer } from "../components/layouts/Footer";
import { Header } from "../components/layouts/Header";
import { TopBar } from "../components/layouts/TopBar";
import { Banner } from "../components/layouts/Banner";

export const MainLayout = () => {
  return (
    <div>
      <TopBar></TopBar>
      <Header></Header>
      <Banner></Banner>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};
