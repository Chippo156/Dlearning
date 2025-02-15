import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import instructor1 from "../../../../img/instructor1.jpg";
import instructor2 from "../../../../img/instructors2.jpg";
import instructor3 from "../../../../img/instructor3.jpg";
import instructor4 from "../../../../img/instructor4.jpg";

export const InstructorsSection = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="section-title text-center position-relative mb-5 ">
          <h1 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
            Meet Our Instructors
          </h1>
          <h5 className="display-6">
            Our instructors are passionate about teaching and sharing their
            knowledge with you.
          </h5>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4">
            <Card
              hoverable
              cover={
                <img
                  style={{ height: "500px" }}
                  alt="example"
                  src={instructor1}
                />
              }
            >
              <Meta
                style={{ textAlign: "center", marginBottom: "10px" }}
                title="Chippo Designer"
                description="Web Designer & Developer"
              />
              <div className="text-center">
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  {" "}
                  <i className="fab fa-youtube"></i>
                </Link>
              </div>
            </Card>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <Card
              hoverable
              cover={
                <img
                  style={{ height: "500px" }}
                  alt="example"
                  src={instructor2}
                />
              }
            >
              <Meta
                style={{ textAlign: "center", marginBottom: "10px" }}
                title="Chippo Designer"
                description="Web Designer & Developer"
              />
              <div className="text-center">
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  {" "}
                  <i className="fab fa-youtube"></i>
                </Link>
              </div>
            </Card>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <Card
              hoverable
              cover={
                <img
                  style={{ height: "500px" }}
                  alt="example"
                  src={instructor3}
                />
              }
            >
              <Meta
                style={{ textAlign: "center", marginBottom: "10px" }}
                title="Chippo Designer"
                description="Web Designer & Developer"
              />
              <div className="text-center">
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  {" "}
                  <i className="fab fa-youtube"></i>
                </Link>
              </div>
            </Card>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <Card
              hoverable
              cover={
                <img
                  style={{ height: "500px" }}
                  alt="example"
                  src={instructor4}
                />
              }
            >
              <Meta
                style={{ textAlign: "center", marginBottom: "10px" }}
                title="Chippo Designer"
                description="Web Designer & Developer"
              />
              <div className="text-center">
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="/" className="mx-1 p-1">
                  {" "}
                  <i className="fab fa-youtube"></i>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
