import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const CourseFeature = ({ course, id, handleEnrollNow, isPurchase }) => {
  const navigate = useNavigate();
  if (!course) {
    return <div>Course data is not available</div>;
  }
  const handleCourseDetail = (courseId) => {
    navigate(`/course-detail/${courseId}`); // Chuyển hướng đến đúng URL chi tiết
  };

  return (
    <div className="col-lg-4 mt-5 mt-lg-0 ">
      <div className="course-features-container mb-5 py-4 px-4 shadow-lg">
        <h3 className="course-feat course-features-title text-white py-3 px-4 m-0">
          Course Features
        </h3>
        <div className="course-features-item d-flex justify-content-between border-bottom px-4 py-2">
          <h5 className="text-white my-2">
            <i className="fa fa-user mr-2 text-info"></i> Instructor
          </h5>
          <h5 className="text-white my-2">{course.author}</h5>
        </div>
        <div className="course-features-item d-flex justify-content-between border-bottom px-4 py-2">
          <h5 className="text-white my-2">
            <i className="fa fa-book mr-2 text-success"></i> Lectures
          </h5>
          <h5 className="text-white my-2">15</h5>
        </div>
        <div className="course-feature-item d-flex justify-content-between border-bottom px-4 py-2">
          <h5 className="text-white my-2">
            <i className="fa fa-clock mr-2 text-danger"></i> Duration
          </h5>
          <h5 className="text-white my-2">{course.duration} hours</h5>
        </div>
        <div className="course-feature-item d-flex justify-content-between border-bottom px-4 py-2">
          <h5 className="text-white my-2">
            <i className="fa fa-signal mr-2 text-warning"></i> Skill level
          </h5>
          <h5 className="text-white my-2">{course.courseLevel}</h5>
        </div>
        <div className="course-feature-item d-flex justify-content-between px-4 py-2">
          <h5 className="text-white my-2">
            <i className="fa fa-language mr-2 text-purple"></i> Language
          </h5>
          <h5 className="text-white my-2">{course.language}</h5>
        </div>
        <h5 className="course-price text-white py-3 px-4 m-0">
          <i className="fa fa-money mr-2 text-warning"></i>
          Course Price: {course.points}
          <span className="currency">
            <i className="fa-solid fa-coins coins-course"></i>
          </span>
        </h5>
        <div className="py-3 px-4">
          <Button
            size="large"
            style={{ width: "100%" }}
            onClick={() => {
              if (isPurchase) {
                navigate(`/lesson-detail/${id}`);
              } else {
                handleEnrollNow();
              }
            }}
          >
            <span className="text-uppercase " style={{ fontWeight: 700 }}>
              {isPurchase ? "Learn Now" : "Enroll Now"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
