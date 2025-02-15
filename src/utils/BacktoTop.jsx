import { BackTop, FloatButton } from "antd";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const BacktoTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <FloatButton.BackTop>
      <div
        style={{
          height: 50,
          width: 50,
          lineHeight: "50px",
          borderRadius: "50%",
          backgroundColor: "#1088e9",
          color: "#fff",
          textAlign: "center",
          fontSize: 14,
        }}
      >
        <i class="fa-solid fa-circle-up fa-2xl"></i>
      </div>
    </FloatButton.BackTop>
  );
};
