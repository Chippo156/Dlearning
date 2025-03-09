import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../../service/CourseService";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import { ViewCourses } from "./components/ViewCourses";
import { toast, ToastContainer } from "react-toastify";
import { Pagination } from "antd";
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { createFavourite } from "../../../service/FavouriteService";

export const CoursePage = () => {
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
        const response = await getAllCourses(currentPage, pageSize);
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
  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: Array.from({
          length: 4,
        }).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    }
  );

  const handleAddFavourite = async (courseId) => {
    try {
      await createFavourite(courseId);
    } catch (error) {
      toast.error("Add favourite failed");
      console.error(error);
    }
  };
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
          <Sider width={"20%"}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={items2}
            />
          </Sider>
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
                backgroundColor: "#fff",
                borderRadius: borderRadiusLG,
              }}
            >
              <div className="container py-3">
                <div className="row mx-0 justify-content-center">
                  <ViewCourses
                    courses={courses}
                    handleAddFavourite={handleAddFavourite}
                  />
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
