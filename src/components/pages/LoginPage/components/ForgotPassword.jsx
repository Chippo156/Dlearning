import { Button, Form, Input } from "antd";
import { InputOTP } from "antd-input-otp";
import { useState } from "react";

export const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [isSend, setIsSend] = useState(false);

  const handleIsSend = () => {
    setIsSend(true);
  };
  const handleOtpSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="container-fluid">
      <div className="content-page">
        <div className="container">
          <div className="row">
            {!isSend ? (
              <div className="col-12 col-md-6 col-lg-4 mx-auto my-5">
                <h1>Forgot Password</h1>
                <div className="my-4 d-flex justify-content-center align-items-center gap-3">
                  <Input type="email" placeholder="Email" />
                  <Button onClick={handleIsSend} type="primary">
                    Send
                  </Button>
                </div>
              </div>
            ) : (
              <div className="row">
                <Form
                  onFinish={handleOtpSubmit}
                  form={form}
                  className="d-flex flex-column
                justify-content-center 
                align-items-center w-100
                "
                >
                  <Form.Item name="otp">
                    <InputOTP inputType="numeric" />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit">Verify OTP</Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
