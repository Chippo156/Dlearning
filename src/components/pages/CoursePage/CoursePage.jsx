import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../../service/CourseService";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import { ViewCourses } from "./components/ViewCourses";
import { toast, ToastContainer } from "react-toastify";
import { Pagination } from "antd";

export const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalElements, setTotalElements] = useState(0);
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: "#fff0e5", paddingBottom: "50px" }}
    >
      <div className="content-page container-fluid">
        <div className="container py-3">
          <div className="row mx-0 justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center position-relative mb-5">
                <h1 className="display-4">Explore Our Latest Courses</h1>
              </div>
            </div>
            <ViewCourses courses={courses} />
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
      </div>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </motion.div>
  );
};
