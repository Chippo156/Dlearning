import { motion } from "framer-motion";
import { LoginForm } from "./components/LoginForm";
import { useEffect, useState } from "react";
import { introspect, login } from "../../../service/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from "../../../utils/LoadingSpinner";
export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Login Page";
  }, []);
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
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
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    login(email, password)
      .then((response) => {
        if (response && response.data && response.data.token) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          introspect(token)
            .then((introspectData) => {
              if (introspectData && introspectData.data.valid) {
                notifySuccess("Login successfully.");
                if (introspectData.data.scope === "USER") {
                  navigate("/login");
                } else if (introspectData.data.scope === "ADMIN") {
                  // navigate("/admin");
                } else if (introspectData.data.scope === "TEACHER") {
                  // navigate("/manager-courses");
                }
              } else {
                notifyError("Invalid token.");
                throw new Error("Invalid token.");
              }
            })
            .catch((error) => {
              console.error("Error during introspect:", error);
              setError(error.message);
            });
        } else {
          throw new Error("Login failed, please try again.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error.message); // In lỗi ra console
        setError(error.message || "Login failed, please try again.");
        notifyError("Login failed, please try again.");
      });
  };
  if (error) {
    <div>{error}</div>;
  }
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }} // Hiệu ứng ban đầu: ẩn và dịch trái
      animate={{ opacity: 1, x: 0 }} // Hiệu ứng khi hiển thị: hiện và dịch về vị trí gốc
      exit={{ opacity: 0, x: 100 }} // Hiệu ứng khi thoát: ẩn và dịch phải
      transition={{ duration: 0.5 }} // Thời gian chuyển động
      className="content-page"
    >
      <section className="py-3 py-md-5 py-xl-8">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        ></LoginForm>

        <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
      </section>
    </motion.div>
  );
};
