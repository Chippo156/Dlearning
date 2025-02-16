import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const AccessDenied = () => {
  const [countdown, setCountdown] = useState(10); // Đếm ngược từ 10 giây
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);
  return (
    <Result
      status="403"
      title="403 Forbidden - You don't have permission to access this page."
      subTitle="Sorry, it seems like you are not allowed to view this content. Please contact the administrator if you believe this is a mistake."
      extra={
        <div>
          <p className="countdown-text">
            You will be redirected to the homepage in {countdown} seconds...
          </p>
          <Button href="/" type="primary" className="text-decoration-none">
            Back Home
          </Button>
        </div>
      }
    />
  );
};
export default AccessDenied;
