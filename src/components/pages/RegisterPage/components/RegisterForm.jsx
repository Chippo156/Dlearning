import { Button, Form } from "antd";
import { InputOTP } from "antd-input-otp";
import { p } from "framer-motion/client";

export const RegisterForm = (props) => {
  const {
    handleRegisterSubmit,
    errorMessage,
    handleOtpSubmit,
    formData,
    handleInputChange,
    handleInputBlur,
    formErrors,
    isOtpSent,
  } = props;
  const [form] = Form.useForm();

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-10 col-xl-8">
        <div className="row gy-5 justify-content-center">
          <div className="col-12 col-lg-8">
            {!isOtpSent ? (
              <form onSubmit={handleRegisterSubmit}>
                <div className="row gy-3 overflow-hidden">
                  <div className="col-12">
                    <div className="form-floating my-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        onBlur={handleInputBlur}
                      />
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      {formErrors.email && (
                        <p className="text-danger">{formErrors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating  my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="firstName"
                        onBlur={handleInputBlur}
                      />
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      {formErrors.firstName && (
                        <p className="text-danger">{formErrors.firstName}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="lastName"
                        onBlur={handleInputBlur}
                      />
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      {formErrors.lastName && (
                        <p className="text-danger">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating mb-3">
                      <input
                        type="date"
                        className="form-control"
                        name="date_of_birth"
                        id="dob"
                        placeholder="Date of Birth"
                        required
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                      />
                      <label htmlFor="dob" className="form-label">
                        Date of Birth
                      </label>
                      {formErrors.date_of_birth && (
                        <p className="text-danger">
                          {formErrors.date_of_birth}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating  my-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        onBlur={handleInputBlur}
                      />
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      {formErrors.password && (
                        <p className="text-danger">{formErrors.password}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating  my-3">
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm password"
                        required
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                      />
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm password
                      </label>
                      {formErrors.confirmPassword && (
                        <p className="text-danger">
                          {formErrors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button
                        className="btn btn-lg btn-dark rounded-0 fs-6"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                  {errorMessage && (
                    <div className="col-12">
                      <p className="text-danger">{errorMessage}</p>
                    </div>
                  )}
                </div>
              </form>
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
