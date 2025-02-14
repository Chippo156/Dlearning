import { div } from "framer-motion/client";
import { Link } from "react-router-dom";

export const LoginForm = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleGoogleLogin,
    handleFacebookLogin,
    handleGithubLogin,
  } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="mb-5">
            <h2 className="display-5 fw-bold text-center">Sign in</h2>
            <p className="text-center m-0">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="row gy-5 justify-content-center">
            <div className="col-12 col-lg-5">
              <form id="login-form" onSubmit={handleLogin}>
                <div className="row gy-3 overflow-hidden">
                  <div className="col-12">
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        required
                        autoComplete="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row justify-content-between">
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="remember_me"
                          />
                          <label
                            className="form-check-label text-secondary"
                            htmlFor="remember_me"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-end">
                          <Link
                            to="/forgot-password"
                            className="link-secondary text-decoration-none"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button
                        className="btn btn-lg btn-dark rounded-0 fs-6"
                        type="submit"
                      >
                        Log in
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-2 d-flex align-items-center justify-content-center gap-3 flex-lg-column">
              <div
                className="bg-dark h-100 d-none d-lg-block"
                style={{ width: "1px", opacity: 0.1 }}
              ></div>
              <div
                className="bg-dark w-100 d-lg-none"
                style={{ height: "1px", opacity: 0.1 }}
              ></div>
              <div>or</div>
              <div
                className="bg-dark h-100 d-none d-lg-block"
                style={{ width: "1px", opacity: 0.1 }}
              ></div>
              <div
                className="bg-dark w-100 d-lg-none"
                style={{ height: "1px", opacity: 0.1 }}
              ></div>
            </div>
            <div className="col-12 col-lg-5 d-flex align-items-center">
              <div className="d-flex gap-3 flex-column w-100">
                <button
                  className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center"
                  id="google-login"
                  onClick={handleGoogleLogin}
                >
                  <i className="bi bi-google text-danger"></i>
                  <span className="ms-2 fs-6 flex-grow-1">
                    Continue with Google
                  </span>
                </button>

                <button
                  className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center"
                  onClick={handleFacebookLogin}
                >
                  <i className="bi bi-facebook"></i>
                  <span className="ms-2 fs-6 flex-grow-1">
                    Continue with Facebook
                  </span>
                </button>

                <button
                  className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center"
                  onClick={handleGithubLogin}
                >
                  <i className="bi bi-github"></i>
                  <span className="ms-2 fs-6 flex-grow-1">
                    Continue with Github
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
