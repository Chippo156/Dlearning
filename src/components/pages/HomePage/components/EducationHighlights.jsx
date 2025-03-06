import { div } from "framer-motion/client";
import aboutImage from "./../../../../img/teacher.png";
import {
  FaBook,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaUserGraduate,
} from "react-icons/fa";
import CountUp from "react-countup";
export const EducationHighlights = () => {
  return (
    <div
      className="container-fluid py-3"
      style={{ backgroundColor: "#fff0e5" }}
    >
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: "500px" }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute w-100 h-100"
                src={aboutImage}
                style={{ objectFit: "cover" }}
                alt="About Us"
              ></img>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="section-title position-relative mb-4">
              <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                About Us
              </h6>
              <h1 className="display-4">
                First Choice For Online Education Anywhere
              </h1>
              <p>
                Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam
                dolor diam ipsum et, tempor voluptua sit consetetur sit.
                Aliquyam diam amet diam et eos sadipscing labore. Clita erat
                ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus
                clita duo justo et tempor consetetur takimata eirmod, dolores
                takimata consetetur invidunt magna dolores aliquyam dolores
                dolore. Amet erat amet et magna
              </p>
              <div className="row pt-3 mx-0 ">
                <div className="col-3 px-0">
                  <div className="bg-success text-center p-4 ads-counter-box">
                    <FaBook className="ads-icon-size mb-2 text-white" />
                    <h1 className="text-white ads-counter-title">
                      <CountUp start={0} end={1234} duration={3} />
                    </h1>
                    <h6 className="text-uppercase text-white ads-counter-subtitle">
                      Available<span className="d-block">Subjects</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-primary text-center p-4 ads-counter-box">
                    <FaLaptopCode className="ads-icon-size mb-2 text-white" />
                    <h1 className="text-white ads-counter-title">
                      <CountUp start={0} end={3456} duration={3} />
                    </h1>
                    <h6 className="text-uppercase text-white ads-counter-subtitle">
                      Online<span className="d-block">Courses</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-danger text-center p-4 ads-counter-box">
                    <FaChalkboardTeacher className="ads-icon-size mb-2 text-white" />
                    <h1 className="text-white ads-counter-title">
                      <CountUp start={0} end={7890} duration={3} />
                    </h1>
                    <h6 className="text-uppercase text-white ads-counter-subtitle">
                      Expert<span className="d-block">Teachers</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-warning text-center p-4 ads-counter-box">
                    <FaUserGraduate className="ads-icon-size mb-2 text-white" />
                    <h1 className="text-white ads-counter-title">
                      <CountUp start={0} end={5678} duration={3} />
                    </h1>
                    <h6 className="text-uppercase text-white ads-counter-subtitle">
                      Happy<span className="d-block">Students</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
