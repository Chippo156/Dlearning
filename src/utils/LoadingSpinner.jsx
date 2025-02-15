import React from "react";
import { Flex, Spin, Switch } from "antd";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {" "}
      <Spin size="large" />
    </div>
  );
};
export default LoadingSpinner;
