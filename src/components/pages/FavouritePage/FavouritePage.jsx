import { motion } from "framer-motion";
import { ViewFavourite } from "./components/ViewFavourite";
import { Breadcrumb, Layout, Menu, Pagination, theme } from "antd";
import { ViewCourses } from "../CoursePage/components/ViewCourses";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { getAllCourses } from "../../../service/CourseService";
import { getAllFavourite } from "../../../service/FavouriteService";
export const FavouritePage = () => {
  const { Header, Content, Sider } = Layout;
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalElements, setTotalElements] = useState(0);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    document.title = "Home Page";
    window.scrollTo(0, 0);
    const fetchCourse = async () => {
      try {
        const response = await getAllFavourite(currentPage, pageSize);
        const { result, totalPages, totalElements } = response.data;
        setTotalPages(totalPages);
        setTotalElements(totalElements);

        setCourses(result);
        if (currentPage >= totalPages) {
          return;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [currentPage, pageSize]);
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: "50px", backgroundColor: "#f5f5f5" }}
    >
      <Layout className="content-page container-fluid ">
        <Layout className="layout-course">
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Breadcrumb
              items={[
                {
                  title: "Home",
                },
                {
                  title: "List",
                },
                {
                  title: "App",
                },
              ]}
              style={{
                margin: "16px 0",
              }}
            ></Breadcrumb>

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                backgroundColor: "#f0",
                borderRadius: borderRadiusLG,
              }}
            >
              <div className="container py-3">
                <h1 className="text-center mb-5">Your Favourite Courses</h1>
                <div className="row mx-0 justify-content-center ">
                  <ViewFavourite courses={courses} />
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination
                      showTotal={(total) => `Total ${total} items`}
                      total={totalElements}
                      current={currentPage}
                      onChange={(page) => setCurrentPage(page)}
                      pageSize={pageSize}
                      showSizeChanger
                      showQuickJumper
                    />
                  </div>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </motion.div>
  );
};
