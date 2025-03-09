import { Pagination } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAdsActive,
  getAdsCurrentLogin,
} from "../../../service/AdvertisementService";
import { AdsTable } from "./components/AdsTable";
export const AdsPage = () => {
  const token = localStorage.getItem("token");
  const [ads, setAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    document.title = "Advertisement";
    const adsByCurrentLogin = async () => {
      try {
        const response = await getAdsCurrentLogin(currentPage, pageSize);
        console.log(response);

        const { result, totalPages, totalElements } = response.data;
        setAds(response.data.result);
        setTotalPages(totalPages);
        setTotalElements(totalElements);
      } catch (error) {
        console.error(error);
      }
    };
    adsByCurrentLogin();
  }, [token, currentPage]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Hiệu ứng khi trang bắt đầu: mờ và dịch xuống
      animate={{ opacity: 1, y: 0 }} // Hiệu ứng khi trang hiện ra: hiện và dịch lên
      exit={{ opacity: 0, y: 50 }} // Hiệu ứng khi rời khỏi trang: mờ và dịch xuống
      transition={{ duration: 0.5 }} // Thời gian chuyển đổi hiệu ứng
      className="content-page"
    >
      <div className="banner-ads">
        <div className="banner-ads-left">
          <div className="banner-ads-content">
            <h1 className="banner-ads-title">Manage Your Advertisement</h1>
            <p className="banner-ads-description">
              Optimize performance and manage campaigns effectively
            </p>
            <Link to="/contact" className="banner-ads-button">
              Get started now
            </Link>
          </div>
        </div>
        <div className="banner-ads-right">
          <img
            src="https://media.vneconomy.vn/w800/images/upload/2021/05/31/quang-cao-so1.png"
            alt="Quản lý quảng cáo"
            className="banner-ads-image"
          />
        </div>
      </div>
      <div className="ads-content">
        <div className="ads-container">
          <div className="ads-filter-bar">
            <label htmlFor="orderByDate" className="ads-form-label">
              Advertisement Sort
            </label>
            <select
              className="ads-form-select"
              id="orderByDate"
              name="orderByDate"
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          <AdsTable
            ads={ads}
            totalElements={totalElements}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <div className="mt-4"></div>
        </div>
      </div>
    </motion.div>
  );
};
