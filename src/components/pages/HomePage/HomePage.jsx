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
import LoadingSpinner from "../../../utils/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { getAdsActive } from "../../../service/AdvertisementService";
import { PromoModal } from "../AdsPage/components/PromoModal";

export const HomePage = () => {
  const [course, setCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [hasMore, setHasMore] = useState(true); // Trạng thái có còn dữ liệu không
  const [loading, setLoading] = useState(true);

  const [showPromoModal, setShowPromoModal] = useState(false);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await getAdsActive();
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        if (response) {
          setAds(response.data);
        } else {
          setAds([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAds();
  }, []);

  const handleClosePromoModal = () => {
    setShowPromoModal(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromoModal(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

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
          setHasMore(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [currentPage, pageSize]);

  const loadMoreCourses = () => {
    if (hasMore) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  };
  if (loading && currentPage === 1) {
    return <LoadingSpinner />;
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }} // Hiệu ứng ban đầu: ẩn và dịch trái
      animate={{ opacity: 1, x: 0 }} // Hiệu ứng khi hiển thị: hiện và dịch về vị trí gốc
      exit={{ opacity: 0, x: 50 }} // Hiệu ứng khi thoát: ẩn và dịch phải
      transition={{ duration: 0.5 }} // Thời gian chuyển động
      className="content-page"
    >
      {showPromoModal && (
        <PromoModal ads={ads} onClose={handleClosePromoModal} />
      )}

      <EducationHighlights />
      <IntroSection />
      <OurCourse
        courses={course}
        hasMore={hasMore}
        loadMoreCourses={loadMoreCourses}
      />
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
