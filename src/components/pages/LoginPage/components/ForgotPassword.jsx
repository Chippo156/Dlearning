import { Button, Form, Input } from "antd";
import { InputOTP } from "antd-input-otp";
import { useState } from "react";
import {
  resetPassword,
  sendOtpForgotPassword,
  verifyOtpForgotPassword,
} from "../../../../service/ForgotPasswordService";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [verify, setVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleIsSend = async () => {
    try {
      const response = await sendOtpForgotPassword(email);
      console.log(response);
      if (response.code === 200) {
        setIsSend(true);
        toast.success("OTP sent successfully");
      } else {
        toast.error("Email not found");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  const handleOtpSubmit = async (values) => {
    const { otp } = values;
    const otpString = otp.join("");
    try {
      const response = await verifyOtpForgotPassword(email, otpString);
      console.log(response);
      if (response.code === 200) {
        setVerify(true);
        toast.success("OTP verified successfully");
      } else {
        toast.error("OTP verification failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleResetPassword = async () => {
    console.log("reset password");
    try {
      const response = await resetPassword(email, password, confirmPassword);
      console.log(response);
      if (response.data.success) {
        toast.success("Password reset successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error("Password reset failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container-fluid">
      <div className="content-page">
        <div className="container">
          <div className="row">
            {!verify ? (
              !isSend ? (
                <div className="col-12 col-md-6 col-lg-4 mx-auto my-5">
                  <h2>Forgot Password</h2>
                  <div className="my-4 d-flex justify-content-center align-items-center gap-3">
                    <Input
                      size="large"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Email"
                    />
                    <Button size="large" onClick={handleIsSend} type="primary">
                      Send
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <Form
                    onFinish={handleOtpSubmit}
                    form={form}
                    className="d-flex flex-column justify-content-center align-items-center w-100"
                  >
                    <Form.Item name="otp">
                      <InputOTP inputType="numeric" />
                    </Form.Item>
                    <Form.Item>
                      <Button htmlType="submit">Verify OTP</Button>
                    </Form.Item>
                  </Form>
                </div>
              )
            ) : (
              <div className="row">
                <h2 className="text-center my-5">
                  Reset Password for{" "}
                  <span className="text-primary">{email}</span>
                </h2>
                <Form className="col-12 col-md-6 col-lg-4 mx-auto my-5">
                  <Form.Item>
                    <Input.Password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="New Password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input.Password
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button onClick={handleResetPassword} type="primary">
                      Reset Password
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
