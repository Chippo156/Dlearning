import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div>
      <div
        className="container-fluid position-relative bg-dark text-white-50 py-1"
        style={{ marginTop: "90px" }}
      >
        <div className="container mt-5 pt-3">
          <div className="row">
            <div className="col-md-6 mb-5">
              <Link to="/" className="navbar-brand">
                <h1 className="mt-n2 text-uppercase text-white">
                  <i className="fa fa-book-reader mr-3"></i> Edukate
                </h1>
              </Link>
              <p className="m-0">
                Accusam nonumy clita sed rebum kasd eirmod elitr. Ipsum ea lorem
                at et diam est, tempor rebum ipsum sit ea tempor stet et
                consetetur dolores. Justo stet diam ipsum lorem vero clita diam
              </p>
            </div>
            <div className="col-md-6 mb-5">
              <h3 className="text-white mb-4">Newsletter</h3>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-light"
                  style={{ padding: "5px", marginRight: "3px" }}
                  placeholder="Your Email Address"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary px-4">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-5">
              <h3 className="text-white mb-4">Get In Touch</h3>
              <p>
                <i className="fa fa-map-marker-alt mr-2"></i>123 Street, New
                York, USA
              </p>
              <p>
                <i className="fa fa-phone-alt mr-2"></i>+012 345 67890
              </p>
              <p>
                <i className="fa fa-envelope mr-2"></i>info@example.com
              </p>
              <div className="d-flex justify-content-start mt-4">
                <Link className="text-white mr-4  text-decoration-none" to="/">
                  <i className="fab fa-2x fa-twitter"></i>
                </Link>
                <Link className="text-white mr-4  text-decoration-none" to="/">
                  <i className="fab fa-2x fa-facebook-f"></i>
                </Link>
                <Link className="text-white mr-4  text-decoration-none" to="/">
                  <i className="fab fa-2x fa-linkedin-in"></i>
                </Link>
                <Link className="text-white  text-decoration-none" to="/">
                  <i className="fab fa-2x fa-instagram"></i>
                </Link>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h3 className="text-white mb-4">Our Courses</h3>
              <div className="d-flex flex-column">
                <Link
                  className="text-white-50 mb-2  text-decoration-none"
                  to="/"
                >
                  <i className="fa fa-angle-right mr-2"></i>Web Design
                </Link>
                <Link
                  className="text-white-50 mb-2  text-decoration-none"
                  to="/"
                >
                  <i className="fa fa-angle-right mr-2"></i>Apps Design
                </Link>
                <Link
                  className="text-white-50 mb-2  text-decoration-none"
                  to="/"
                >
                  <i className="fa fa-angle-right mr-2"></i>Marketing
                </Link>
                <Link
                  className="text-white-50 mb-2  text-decoration-none"
                  to="/"
                >
                  <i className="fa fa-angle-right mr-2"></i>Research
                </Link>
                <Link className="text-white-50  text-decoration-none" to="/">
                  <i className="fa fa-angle-right mr-2"></i>SEO
                </Link>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h3 className="text-white mb-4">Quick Links</h3>
              <div className="d-flex flex-column">
                <Link
                  className="text-white-50 mb-2 text-decoration-none"
                  to="/"
                >
                  <i className="fa fa-angle-right mr-2 "></i>Privacy Policy
                </Link>
                <Link
                  className="text-white-50 mb-2  text-decoration-none"
                  to="/"
                >
                  <i className="fa fa-angle-right mr-2"></i>Terms & Condition
                </Link>
                <Link
                  className="text-white-50 mb-2  text-decoration-none"
                  to="/"
                >
                  <i className="fa fa-angle-right mr-2"></i>Regular FAQs
                </Link>
                <Link
                  className="text-white-50 mb-2  text-decoration-none"
                  to="/"
                >
                  <i className="fa fa-angle-right mr-2"></i>Help & Support
                </Link>
                <Link className="text-white-50  text-decoration-none" to="/">
                  <i className="fa fa-angle-right mr-2"></i>Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid bg-dark text-white-50 border-top py-4"
        style={{ borderColor: "rgba(256, 256, 256, 0.1)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
              <p className="m-0">
                Copyright &copy;
                <Link className="text-white" to="/">
                  Your Site Name
                </Link>
                . All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-right">
              <p className="m-0">
                Designed by
                <a className="text-white" href="https://htmlcodex.com">
                  Chippo
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
