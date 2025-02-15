import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "./components/RegisterForm";
import { useEffect, useState } from "react";
import { checkUserExists, registerUser } from "../../../service/UserSevice";

export const RegisterPage = () => {
  useEffect(() => {
    document.title = "Register Page";
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    date_of_birth: "",
    otp: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    date_of_birth: "",
    otp: "",
  });

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //Xử lý thay đổi giá trị

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    //Kiểm tra lỗi
    setFormErrors({
      ...formErrors,
      [name]: value ? "" : formErrors[name],
    });
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setFormErrors({
        ...formErrors,
        [name]: "This field cannot be left blank",
      });
    } else {
      if (formData.password !== formData.confirmPassword) {
        setFormErrors({
          ...formErrors,
          confirmPassword: "Passwords do not match",
        });
        return;
      }
      if (formData.password.length < 6) {
        setFormErrors({
          ...formErrors,
          password: "Password must be at least 6 characters",
        });
        return;
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const checkUserExist = await checkUserExists(formData.email);
      console.log(checkUserExist);

      if (checkUserExist.data) {
        setErrorMessage("Email already exists");
        return;
      } else {
        setErrorMessage("");
        const response = await registerUser(formData.otp, formData);
        if (response.code === 200) {
          navigate("/login");
          alert("Register successfully");
        } else {
          setErrorMessage(response.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                  Already have an account? <Link to={"/login"}>Sign in</Link>
                </p>
              </div>
            </div>
          </div>
          <RegisterForm
            errorMessage={errorMessage}
            formData={formData}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
            handleRegisterSubmit={handleRegisterSubmit}
            isOtpSent={isOtpSent}
          ></RegisterForm>
        </div>
      </section>
    </motion.div>
  );
};
