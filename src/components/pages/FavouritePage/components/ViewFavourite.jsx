import { Button, Card, Image, Pagination, Rate } from "antd";
import Meta from "antd/es/card/Meta";
import {
  FaHeartBroken,
  FaRegClock,
  FaRemoveFormat,
  FaTrash,
} from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export const ViewFavourite = ({ courses, handleDeleteFavourite }) => {
  const navigate = useNavigate();
  const truncate = (text, maxWords) => {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };
  const handleDetailCourse = (id) => {
    navigate(`/course-detail/${id}`);
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

                  {/* Image */}
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
                <div className="course-card-footer-item">
                  <FaHeartBroken
                    onClick={() => handleDeleteFavourite(course.favoriteId)}
                    style={{ cursor: "pointer" }}
                  />
                  <span>Remove</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};
