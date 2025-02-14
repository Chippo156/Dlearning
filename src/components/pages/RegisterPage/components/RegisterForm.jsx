import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { Button, DatePicker } from "antd";

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
  dayjs.extend(customParseFormat);

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-10 col-xl-8">
        <div className="row gy-5 justify-content-center">
          <div className="col-12 col-lg-8">
            <form>
              <div className="row gy-3 overflow-hidden">
                <div className="col-12">
                  <div className="form-floating my-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                    />
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating  my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="firstName"
                    />
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating  my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="lastName"
                    />
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div style={{ width: "100%" }}>
                    <DatePicker
                      style={{ width: "100%", height: "58px" }}
                      defaultValue={dayjs("01/01/2015", dateFormatList[0])}
                      format={dateFormatList}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating  my-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-floating  my-3">
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm password"
                    />
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm password
                    </label>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
