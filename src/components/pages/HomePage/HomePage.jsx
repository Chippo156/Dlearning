import { motion } from "framer-motion";
import { EducationHighlights } from "./components/EducationHighlights";
import { IntroSection } from "./components/IntroSection";
import { InstructorsSection } from "./components/InstructorsSection";
import { FeedbackSection } from "./components/FeedbackSection";
import { InfoContact } from "../ContactPage/components/InfoContact";
import { ContactSection } from "./components/ContactSection";
export const HomePage = () => {
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
