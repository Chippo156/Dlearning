import { motion } from "framer-motion";
import { EducationHighlights } from "./components/EducationHighlights";
import { IntroSection } from "./components/IntroSection";
import { InstructorsSection } from "./components/InstructorsSection";
import { FeedbackSection } from "./components/FeedbackSection";
import { InfoContact } from "../ContactPage/components/InfoContact";
import { ContactSection } from "./components/ContactSection";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../../service/CourseService";
import { OurCourse } from "./components/OurCourse";
export const HomePage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);

  useEffect(() => {
    document.title = "Home Page";
    const fetchCourse = async () => {
      try {
        const response = await getAllCourses(currentPage, pageSize);
        const { result, totalPages } = response.data;

        if (currentPage === 1) {
          setCourse(result);
        } else {
          setCourse((prevCourse) => {
            const newCourses = result.filter(
              (course) =>
                !prevCourse.some((prevCourse) => prevCourse.id === course.id)
            );
            return [...prevCourse, ...newCourses];
          });
        }
        if (currentPage >= totalPages) {
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [currentPage, pageSize]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }} // Hiệu ứng ban đầu: ẩn và dịch trái
      animate={{ opacity: 1, x: 0 }} // Hiệu ứng khi hiển thị: hiện và dịch về vị trí gốc
      exit={{ opacity: 0, x: 50 }} // Hiệu ứng khi thoát: ẩn và dịch phải
      transition={{ duration: 0.5 }} // Thời gian chuyển động
      className="content-page"
    >
      <EducationHighlights />
      <IntroSection />
      <OurCourse courses={course} />
      <InstructorsSection />
      <FeedbackSection />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <InfoContact />
            <ContactSection />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
