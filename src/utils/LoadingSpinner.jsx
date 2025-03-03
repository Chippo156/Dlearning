import React from "react";
import { Flex, Spin, Switch } from "antd";
import { ToastContainer } from "react-toastify";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Spin size="large" />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
export default LoadingSpinner;
