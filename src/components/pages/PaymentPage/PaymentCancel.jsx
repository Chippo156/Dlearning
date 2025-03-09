import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PaymentCancel = () => {

    useEffect(() => {
        document.title = 'Payment Cancel'
    })
    
    return (
        <div className="payment-cancel-container">
            <img
                src="https://www.nbk.vn/upload/khoungdung/vn-pay.jpg"
                alt="VNPay"
                className="payment-vnpay-logo"
            />
            <h1>Thanh toán đã bị hủy</h1>
            <div className="payment-crossmark"></div>
            <p>Giao dịch của bạn đã bị hủy. Nếu bạn có thắc mắc, vui lòng liên hệ với bộ phận hỗ trợ khách hàng.</p>
            <Link to="/" className="payment-button">Quay lại trang chủ</Link>
        </div>
    );
};
