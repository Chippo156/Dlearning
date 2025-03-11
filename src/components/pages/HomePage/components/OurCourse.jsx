import { Button, Card, Image, Rate } from "antd";
import Meta from "antd/es/card/Meta";
import { FaRegClock } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
export const OurCourse = (props) => {
  const { courses, hasMore, loadMoreCourses } = props;

  const navigate = useNavigate();
  const handleDetailCourse = (id) => {
    navigate(`/course-detail/${id}`);
  };
  const truncate = (text, maxWords) => {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  return (
    <div className="course-background p-0">
      <div className="py-5 container">
        <div className="row mx-0 justify-content-center pt-5 mb-4">
          <div className="col-lg-6">
            <div className="section-title text-center position-relative mb-4">
              <h4 className="text-light d-inline-block position-relative text-secondary text-uppercase pb-2">
                Our Courses
              </h4>
              <h1 className="display-4 text-light" style={{ fontWeight: 700 }}>
                Checkout New Releases Of Our Courses
              </h1>
            </div>
          </div>
        </div>

        <div className="row">
          {courses.map((course) => (
            <div className="col-lg-3 col-md-6 mb-4" key={course.id}>
              <div className="outline bg-white">
                <Card
                  className="position-relative card"
                  hoverable
                  style={{ minHeight: "200px" }} // Giữ chiều cao tối thiểu
                  cover={
                    <div className="w-100 h-100" style={{ height: "100%" }}>
                      {/* Badge */}
                      {course.typeCourse && (
                        <div
                          className={`course-card-badge ${course.typeCourse.toLowerCase()}`}
                        >
                          {course.typeCourse.charAt(0) +
                            course.typeCourse.slice(1).toLowerCase()}{" "}
                          path
                        </div>
                      )}
                      <img
                        style={{
                          width: "100%",
                          height: "120px", // Ảnh luôn bằng với Card
                          objectFit: "cover", // Ảnh không bị méo
                        }}
                        alt="example"
                        src={
                          course.thumbnail
                            ? course.thumbnail
                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADDCAMAAACxkIT5AAAA..."
                        }
                      />
                      {/* Image */}
                    </div>
                  }
                >
                  <Meta
                    onClick={() => handleDetailCourse(course.id)}
                    style={{
                      height: 130,
                    }}
                    title={course.title}
                    description={truncate(course.description, 12)}
                  />
                  <div className="d-flex justify-content-center align-items-center">
                    <Rate allowHalf defaultValue={4} />
                  </div>
                  <div className="course-card-custom-footer pt-2 p-0">
                    <div className="course-card-footer-item">
                      <GiTeacher />
                      <span>{course.author}</span>
                    </div>
                    <div className="course-card-footer-item">
                      <FaRegClock />
                      <span>{course.duration} hrs</span>
                    </div>
                    <div
                      className="course-card-footer-item"
                      onClick={() => handleAddFavourite(course.id)}
                    >
                      <MdFavorite />
                      <span>Favorite</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>

        <div className="row justify-content-center mt-4">
          {hasMore ? (
            <Button
              type="primary"
              size="large"
              style={{ width: "150px" }}
              onClick={loadMoreCourses}
            >
              Show more
            </Button>
          ) : (
            <p className="text-center">All courses loaded</p>
          )}
        </div>
      </div>
    </div>
  );
};
