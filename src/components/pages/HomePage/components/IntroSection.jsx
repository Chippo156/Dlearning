import featureImage from "../../../../img/feature.jpg";
export const IntroSection = () => {
  return (
    <div className="container-fluid bg-image">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 my-5 pt-5 pb-lg-5">
            <div className="section-title position-relative mb-4 ">
              <h6 className="text-uppercase pb-2 d-inline-block position-relative text-secondary">
                Why Choose Us?
              </h6>
              <h1 className="display-4">
                Why You Should Choose Chippo Learning for Your Online Education
              </h1>
            </div>
            <p className="mb-4 pb-2">
              Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam
              dolor diam ipsum et, tempor voluptua sit consetetur sit. Aliquyam
              diam amet diam et eos sadipscing labore. Clita erat ipsum et lorem
              et sit, sed stet no labore lorem sit. Sanctus clita duo justo et
              tempor consetetur takimata eirmod, dolores takimata consetetur
              invidunt magna dolores aliquyam dolores dolore. Amet erat amet et
              magna
            </p>
            <div className="d-flex mb-3 gap-4 align-items-center">
              <div className="w-25 btn-icon bg-primary mr-4 p-4 d-flex justify-content-center align-items-center">
                <i className="fa fa-2x fa-graduation-cap text-white"></i>
              </div>
              <div className="mt-n1">
                <h4>Skilled Instructors</h4>
                <p className="m-0">
                  Labore rebum duo est Sit dolore eos sit tempor eos stet, vero
                  vero clita magna kasd no nonumy et eos dolor magna ipsum.
                </p>
              </div>
            </div>
            <div className="d-flex mb-3 gap-4 align-items-center">
              <div className="w-25 btn-icon bg-secondary mr-4 p-4 d-flex justify-content-center align-items-center">
                <i className="fa fa-2x fa-certificate text-white"></i>
              </div>
              <div className="mt-n1">
                <h4>International Certificate</h4>
                <p className="m-0">
                  Labore rebum duo est Sit dolore eos sit tempor eos stet, vero
                  vero clita magna kasd no nonumy et eos dolor magna ipsum.
                </p>
              </div>
            </div>
            <div className="d-flex mb-3 gap-4 align-items-center">
              <div className="w-25 btn-icon bg-success mr-4  p-4 d-flex justify-content-center align-items-center">
                <i className="fa fa-2x fa-trophy text-white"></i>
              </div>
              <div className="mt-n1">
                <h4>Job Placement Assistance</h4>
                <p className="m-0">
                  Labore rebum duo est Sit dolore eos sit tempor eos stet, vero
                  vero clita magna kasd no nonumy et eos dolor magna ipsum.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-5" style={{ minHeight: "500px" }}>
            <div className="position-relative h-100">
              <img
                style={{ objectFit: "cover" }}
                alt="Features"
                className="position-absolute w-100 h-100"
                src={featureImage}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
