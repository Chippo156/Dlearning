import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "./components/RegisterForm";
import { useEffect } from "react";

export const RegisterPage = () => {
  useEffect(() => {
    document.title = "Register Page";
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    data_of_birth: "",
    otp: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    data_of_birth: "",
    otp: "",
  });

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //Xử lý thay đổi giá trị

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }} // Hiệu ứng ban đầu: ẩn và dịch phải
      animate={{ opacity: 1, x: 0 }} // Hiệu ứng khi hiển thị: hiện và dịch về vị trí gốc
      exit={{ opacity: 0, x: -100 }} // Hiệu ứng khi thoát: ẩn và dịch trái
      transition={{ duration: 0.5 }} // Thời gian chuyển động
      className="content-page"
    >
      <section className="py-3 py-md-5 py-xl-8">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div class="mb-5">
                <h2 class="display-5 fw-bold text-center">Sign up</h2>
                <p class="text-center m-0">
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
              </div>
            </div>
          </div>
          <RegisterForm></RegisterForm>
        </div>
      </section>
    </motion.div>
  );
};
