import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const PaymentFail = () => {
  useEffect(() => {
    document.title = "Payment Failed";
  });

  return (
    <div className="payment-fail-container">
      <img
        src="https://www.nbk.vn/upload/khoungdung/vn-pay.jpg"
        alt="VNPay"
        className="payment-vnpay-logo"
      />
      <h1>Thanh toán thất bại</h1>
      <div className="payment-crossmark"></div>
      <p>Rất tiếc, giao dịch của bạn không thành công. Vui lòng thử lại sau.</p>
      <Link to="/" className="payment-button">
        Quay lại trang chủ
      </Link>
    </div>
  );
};
