import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import {
  getAllCourses,
  getAllCoursesCaching,
  filterCourseNewest,
  filterCourseOldest,
} from "../../../service/CourseService";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import { ViewCourses } from "./components/ViewCourses";
import { toast, ToastContainer } from "react-toastify";
import { Button, Select, Pagination } from "antd";
import { Layout, theme } from "antd";
import { createFavourite } from "../../../service/FavouriteService";
import { Search } from "./components/Search";

export const CoursePage = () => {
  const { Header, Content, Sider } = Layout;
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [option, setOption] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Hàm fetch dữ liệu dùng chung
  const fetchCourses = useCallback(async () => {
    try {
      let response;

      if (option === "3") {
        response = await filterCourseNewest(currentPage, pageSize);
      } else if (option === "4") {
        response = await filterCourseOldest(currentPage, pageSize);
      } else {
        response = keyword
          ? await getAllCourses(currentPage, pageSize, keyword)
          : await getAllCoursesCaching(currentPage, pageSize);
      }

      const { result, totalPages, totalElements } = response.data;

      // Chỉ update state khi giá trị thực sự thay đổi
      setCourses((prev) =>
        JSON.stringify(prev) !== JSON.stringify(result) ? result : prev
      );
      setTotalPages((prev) => (prev !== totalPages ? totalPages : prev));
      setTotalElements((prev) =>
        prev !== totalElements ? totalElements : prev
      );
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, pageSize, keyword, option]);

  // Gọi fetch khi các state thay đổi
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loading) {
    return <LoadingSpinner />;
  }

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
          <Search
            setKeyword={setKeyword}
            setCourses={setCourses}
            setTotalPages={setTotalPages}
            setTotalElements={setTotalElements}
          />
          <Layout style={{ padding: "0 24px 24px" }}>
            <div className="d-flex justify-content-between align-items-center my-3">
              <h5>
                Browse the full catalog{" "}
                <span className="text-secondary">{totalElements} results</span>
              </h5>
              <Select
                defaultValue="All"
                style={{ width: 140, borderRadius: 10 }}
                onChange={setOption}
              >
                <Select.Option value="0">All</Select.Option>
                <Select.Option value="1">Most popular</Select.Option>
                <Select.Option value="2">Highest rated</Select.Option>
                <Select.Option value="3">Newest</Select.Option>
                <Select.Option value="4">Oldest</Select.Option>
              </Select>
            </div>

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
                      onChange={setCurrentPage}
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
      <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
};
