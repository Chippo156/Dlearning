import { Image, Table } from "antd";
import { useEffect, useState } from "react";
import { Nav, NavItem, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  buyCourse,
  getChapterById,
  getCourseDetailById,
} from "../../../service/CourseService";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import { CourseFeature } from "./components/CourseFeature";
import { CourseContent } from "./components/CourseContent";
import { checkPurchase } from "../../../service/EnrollmentService";
import Swal from "sweetalert2";

export const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPurchase, setIsPurchase] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [infoTeacher, setInfoTeacher] = useState({
    userId: null,
    name: "",
    avatar: "",
    avgRating: 0,
    reviewAmount: 0,
    studentAmount: 0,
    courseAmount: 0,
    description: "",
  });

  useEffect(() => {
    document.title = "Course Detail";
  }, []);
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const courseResponse = await getCourseDetailById(id);

        if (courseResponse && courseResponse.data) {
          setCourse(courseResponse.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  useEffect(() => {
    getChapterById(id)
      .then((response) => {
        setChapters(response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const result = await checkPurchase(id);
        if (result && result.data && result.data.purchased) {
          setIsPurchase(true);
        }
      } catch (error) {
        console.error(error);
        setIsPurchase(false);
      }
    };
    if (id) {
      fetchPurchase();
    }
  }, [id]);

  const handleEnrollNow = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to buy this course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, buy now!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await buyCourse(id);
          if (response && response.data) {
            Swal.fire(
              "Success!",
              `You have successfully purchased this course: ${response.data.title}!`,
              "success"
            );
          } else {
            Swal.fire({
              title: "Purchase fail!",
              text: `${response.data.message}`,
              icon: "error",
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text:
              error.message ||
              "An error occurred while purchasing the course. Please try again later.",
            icon: "error",
          });
        }
      }
    });
  };

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (!course) {
    return <div>Course data is not available</div>;
  }

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-4 p-4 bg-white rounded-3 shadow">
              <h1 className="h2 text-dark mb-3 animated-title">
                {course.title}
              </h1>
              <div className="overflow-hidden rounded-3">
                <Image
                  className="w-100 object-fit-cover"
                  style={{ height: "300px" }}
                  src={course.thumbnail}
                  alt="Course Thumbnail"
                />
              </div>
              <p className="lead text-muted mt-3">{course.description}</p>
            </div>

            <Tab.Container defaultActiveKey="course-detail">
              <Nav>
                <Nav.Item>
                  <Nav.Link eventKey="course-detail">Course Content</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="info-teach">Instructor</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="review">Reviews</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="course-detail">
                  <CourseContent chapters={chapters} />
                </Tab.Pane>
                <Tab.Pane eventKey="info-teach">
                  <h3>Instructor</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Labore, voluptates nobis reprehenderit ut commodi
                    repudiandae tempore officia neque ratione. Odit nobis fugiat
                    dicta, non eius dolore impedit quod optio accusamus. Eaque
                    quos ducimus in error et ipsam labore dolore voluptate unde
                    ea, pariatur ut beatae placeat quas culpa inventore possimus
                    numquam, exercitationem, ad consequatur omnis facere ratione
                    earum. Incidunt, explicabo!
                  </p>
                </Tab.Pane>
                <Tab.Pane eventKey="review">
                  <h3>Reviews</h3>
                  <Table
                    columns={[
                      {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                      },
                      {
                        title: "Review",
                        dataIndex: "review",
                        key: "review",
                      },
                    ]}
                    dataSource={[
                      {
                        key: "1",
                        name: "John Brown",
                        review: "good course",
                      },
                      {
                        key: "2",
                        name: "Jim Green",
                        review: "bad course",
                      },
                      {
                        key: "3",
                        name: "Joe Black",
                        review: "good course",
                      },
                    ]}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
          <CourseFeature
            course={course}
            id={id}
            handleEnrollNow={handleEnrollNow}
            isPurchase={isPurchase}
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        className="custom-toast-container"
      />
    </div>
  );
};
