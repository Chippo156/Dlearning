import { motion } from "framer-motion";
import { LoginForm } from "./components/LoginForm";
import { useEffect, useState } from "react";
import { introspect, login } from "../../../service/AuthenticationService";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    if (token) {
      introspect(token)
        .then((introspectData) => {
          if (introspectData.data.valid) {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error during introspect:", error);
          setError(error.message);
        });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    login(email, password).then((response) => {
      if (response && response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        introspect(token)
          .then((introspectData) => {
            if (introspectData && introspectData.data.valid) {
              if (introspectData.data.scope === "USER") {
                navigate("/login");
              } else if (introspectData.data.scope === "ADMIN") {
                // navigate("/admin");
                navigate("/");
              } else if (introspectData.data.scope === "TEACHER") {
                // navigate("/manager-courses");
              }
            } else {
              throw new Error("Invalid token.");
            }
          })
          .catch((error) => {
            console.error("Error during introspect:", error);
            setError(error.message);
          });
      }
    });
  };
  if (error) {
    <div>{error}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }} // Hiệu ứng ban đầu: ẩn và dịch trái
      animate={{ opacity: 1, x: 0 }} // Hiệu ứng khi hiển thị: hiện và dịch về vị trí gốc
      exit={{ opacity: 0, x: 100 }} // Hiệu ứng khi thoát: ẩn và dịch phải
      transition={{ duration: 0.5 }} // Thời gian chuyển động
      className="content-page"
    >
      <section className="py-3 py-md-5 py-xl-8"></section>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      ></LoginForm>
    </motion.div>
  );
};
