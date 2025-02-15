import { Carousel } from "antd";
import feedBack1 from "../../../../img/testimonial-1.jpg";
import feedBack2 from "../../../../img/testimonial-2.jpg";

export const FeedbackSection = () => {
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <div className="container-fluid py-5 bg-image" style={{ margin: "90px 0" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-5 mb-5 mb-lg-0">
            <div className="section-title position-relative mb-4">
              <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                Feedback
              </h6>
              <h1 className="display-4">What Our Students Say About Us</h1>
              <p className="mb-4 ">
                Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam
                dolor diam ipsum et, tempor voluptua sit consetetur sit.
                Aliquyam diam amet diam et eos sadipscing labore. Clita erat
                ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur nobis ipsa alias quibusdam adipisci, voluptatibus
                illum soluta dicta. Velit a voluptatum deserunt fuga itaque
                ipsam, quasi saepe! Commodi, magni dolore.
              </p>
            </div>
          </div>
          <div className="col-lg-7 mb-5 mb-lg-0">
            <div className="position-relative h-100 bg-white">
              <Carousel autoplay autoplaySpeed={3000}>
                <div className=" p-5">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                  <div className="d-flex flex-shrink-0 align-items-center mt-4">
                    <img
                      src="https://i.pinimg.com/236x/a6/ea/90/a6ea9049f7863e397a5792d4993c09b4.jpg"
                      alt="John Doe"
                      className="img-fluid me-4 rounded-2"
                    ></img>
                    <div>
                      <h4>John Doe</h4>
                      <span>Web design</span>
                      <p className="my-3">
                        Sed et elitr ipsum labore dolor diam, ipsum duo vero sed
                        sit est est ipsum eos clita est ipsum. Est nonumy tempor
                        at kasd. Sed at dolor duo ut dolor, et justo erat dolor
                        magna sed stet amet elitr duo lorem
                      </p>
                    </div>
                  </div>
                  <i className="float-end fa fa-3x fa-quote-right text-primary"></i>
                </div>
                <div className=" p-5">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>

                  <div className="d-flex flex-shrink-0 align-items-center mt-4">
                    <img
                      className="img-fluid me-4 rounded-2"
                      src="https://i.pinimg.com/236x/70/99/d0/7099d0e9baa592129218b840e007edb3.jpg"
                      alt="Student 2"
                    />
                    <div>
                      <h5>Student Name</h5>
                      <span>Web Design</span>
                      <p className="my-3">
                        Sed et elitr ipsum labore dolor diam, ipsum duo vero sed
                        sit est est ipsum eos clita est ipsum. Est nonumy tempor
                        at kasd. Sed at dolor duo ut dolor, et justo erat dolor
                        magna sed stet amet elitr duo lorem
                      </p>
                    </div>
                  </div>
                  <i className="fa fa-3x fa-quote-right text-primary mb-4 float-end"></i>
                </div>
                <div className=" p-5">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>

                  <div className="d-flex flex-shrink-0 align-items-center mt-4">
                    <img
                      className="img-fluid me-4 rounded-2"
                      src="https://i.pinimg.com/236x/ee/86/34/ee8634272b8b54442899975e21fef87a.jpg"
                      alt="Student 2"
                    />
                    <div>
                      <h5>Student Name</h5>
                      <span>Web Design</span>
                      <p className="my-3">
                        Sed et elitr ipsum labore dolor diam, ipsum duo vero sed
                        sit est est ipsum eos clita est ipsum. Est nonumy tempor
                        at kasd. Sed at dolor duo ut dolor, et justo erat dolor
                        magna sed stet amet elitr duo lorem
                      </p>
                      <p></p>
                    </div>
                  </div>
                  <i className="float-end fa fa-3x fa-quote-right text-primary"></i>
                </div>
                <div className=" p-5">
                  <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>

                  <div className="d-flex flex-shrink-0 align-items-center mt-4">
                    <img
                      className="img-fluid me-4 rounded-2"
                      src="https://i.pinimg.com/236x/fc/f8/1f/fcf81f6542f9f7cb44ba9e5e4cd3d08c.jpg"
                      alt="Student 2"
                    />
                    <div>
                      <h5>Student Name</h5>
                      <span>Web Design</span>
                      <p>
                        Sed et elitr ipsum labore dolor diam, ipsum duo vero sed
                        sit est est ipsum eos clita est ipsum. Est nonumy tempor
                        at kasd. Sed at dolor duo ut dolor, et justo erat dolor
                        magna sed stet amet elitr duo lorem
                      </p>
                    </div>
                  </div>
                  <i className="float-end fa fa-3x fa-quote-right text-primary"></i>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
