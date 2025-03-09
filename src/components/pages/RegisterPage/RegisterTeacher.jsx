import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { RegisterTeachForm } from "./components/RegisterTeachForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerTeacher } from "../../../service/RegisterTeacherService";
import { getMediaSize } from "antd/es/grid/style";
import { myInfo } from "../../../service/UserSevice";

export const RegisterTeacher = () => {
  useEffect(() => {
    document.title = "Register Teacher";
  }, []);

  const [loadingRegister, setLoadingRegister] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    expertise: "",
    yearsOfExperience: 0,
    bio: "",
    facebookLink: "",
    cv: null,
    certificate: null,
  });

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleSubmit = async (data) => {
    setLoadingRegister(true);
    const formDataToSend = new FormData();
    const jsonBlob = new Blob(
      [
        JSON.stringify({
          fullName: data.name,
          email: data.email,
          phoneNumber: data.phone,
          expertise: data.expertise,
          yearsOfExperience: data.yearsOfExperience,
          bio: data.bio,
          facebookLink: data.facebookLink,
        }),
      ],
      { type: "application/json" }
    );
    formDataToSend.append("request", jsonBlob);
    formDataToSend.append("cv", formData.cv);
    formDataToSend.append("certificate", formData.certificate);

    try {
      const response = await registerTeacher(formDataToSend);
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      if (response && response.data) {
        toast.success("Register successfully! Please wait for admin approval.");
        return;
      }
      if (
        response.code === 400 &&
        response.message ===
          "Your request is pending review, please do not resubmit."
      ) {
        toast.error("Your request is pending review, please do not resubmit");
        return;
      }
    } catch (error) {
      toast.error("An error occurred while registering.");
      console.error(error);
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <div className="content-page">
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="custom-card shadow-sm p-4 rounded-4">
              <h2 className="text-center mb-4 text-primary form-title">
                <TypeAnimation
                  sequence={[
                    "Become a Teacher",
                    1000,
                    "Share Your Knowledge",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    display: "inline-block",
                    color: "#007bff",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                    letterSpacing: "0.05em",
                  }}
                  repeat={Infinity}
                />
              </h2>

              <p className="text-center mb-5 text-muted form-subtitle">
                Share your expertise and join our community of professionals.
              </p>
              <RegisterTeachForm
                formData={formData}
                handleSubmit={handleSubmit}
                loadingRegister={loadingRegister}
                handleFileChange={handleFileChange}
              />
            </div>
          </div>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
};
