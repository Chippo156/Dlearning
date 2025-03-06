import { Card, Image, Pagination, Rate } from "antd";
import Meta from "antd/es/card/Meta";
import { FaRegClock } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export const ViewCourses = ({ courses }) => {
  const navigate = useNavigate();
  const truncate = (text, maxWords) => {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };
  return (
    <div className="row">
      {courses.map((course) => (
        <div className="col-lg-3 col-md-6 mb-4  " key={course.id}>
          <div className=" outline bg-white ">
            <Card
              className="position-relative card"
              hoverable
              cover={
                <Image
                  style={{ height: "140px", width: "100%" }}
                  alt="example"
                  src={
                    course.thumbnail
                      ? course.thumbnail
                      : "data:image/png;base64,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"
                  }
                />
              }
            >
              <Meta
                onClick={() => handleDetailCourse(course.id)}
                style={{
                  height: 120,
                }}
                title={course.title}
                description={truncate(course.description, 13)}
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
                  //   onClick={() => handleAddToFavorites(course.id)}
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
  );
};
