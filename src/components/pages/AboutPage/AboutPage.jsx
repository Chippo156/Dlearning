import { motion } from "framer-motion";
import { EducationHighlights } from "../HomePage/components/EducationHighlights";
import { IntroSection } from "../HomePage/components/IntroSection";
export const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="content-page"
    >
      <EducationHighlights />
      <IntroSection />
    </motion.div>
  );
};
