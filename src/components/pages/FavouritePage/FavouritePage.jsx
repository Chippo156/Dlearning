import { motion } from "framer-motion";
import { ViewFavourite } from "./components/ViewFavourite";
export const FavouritePage = () => {
  return (
    <motion.div
      className="content-page"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <h2>Your Favourite Courses</h2>

        <ViewFavourite />
      </div>
    </motion.div>
  );
};
