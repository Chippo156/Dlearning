import { Progress } from "antd";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ProgressBar = ({ courseTitle, completionData }) => {
  const navigate = useNavigate();
  const { totalLessonComplete, totalLessons, completionPercentage } =
    completionData;

  const handleClickToHome = () => {
    navigate("/");
  };
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-course-info">
        <div className="progress-bar-back-button">
          <button className="circle-back-button" onClick={handleClickToHome}>
            <FaChevronLeft />
          </button>
        </div>
        <div className="progress-bar-course-title">{courseTitle}</div>
        <div className="progress-bar-right-section">
          <div className="progress-bar-progress-details">
            <div className="progress-bar-circle-percentage">
              <Progress
                type="circle"
                percent={completionPercentage}
                size={40}
                format={(percent) => (
                  <span style={{ color: "white" }}>{percent}%</span>
                )}
              />
            </div>
            <div className="progress-bar-lesson-info">
              {totalLessonComplete}/{totalLessons} Lessons
            </div>
          </div>
          <div className="progress-bar-extra-options">
            <span className="progress-bar-note-icon">📝 Note</span>
            <span className="progress-bar-help-icon">❓ Instruct</span>
          </div>
        </div>
      </div>
    </div>
  );
};
