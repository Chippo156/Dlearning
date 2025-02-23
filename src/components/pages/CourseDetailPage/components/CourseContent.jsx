import { Collapse } from "antd";
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdOndemandVideo, MdOutlinePlayLesson } from "react-icons/md";

export const CourseContent = ({ chapters }) => {
  const chapter = chapters?.chapters || [];
  const [expandedLesson, setExpandedLesson] = useState({});
  const handleToggleLesson = (index) => {
    setExpandedLesson((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  return (
    <div className="course-content-container">
      <h2 className="course-content-header">Course Content</h2>
      <p className="course-content-summary">
        {chapter.length} Chapter •{" "}
        {chapter.reduce(
          (acc, chapter) => acc + (chapter.lessonDto?.length || 0),
          0
        )}{" "}
        Lessons
      </p>
      {chapter.map((chapter, index) => (
        <Collapse
          key={chapter.chapterId}
          size="large"
          style={{ marginBottom: "1rem" }}
          items={[
            {
              key: "1",
              label: `${chapter.chapterName}`,
              children:
                chapter.lessonDto.length !== 0 ? (
                  <div>
                    {chapter.lessonDto.map((lesson, index) => (
                      <li key={lesson.lessonId}>
                        <MdOndemandVideo className="lecture-icon" />{" "}
                        {lesson.lessonName || "No Title"}
                      </li>
                    ))}
                  </div>
                ) : (
                  <div>
                    <li>
                      <MdOutlinePlayLesson className="lecture-icon" /> No lesson
                      available
                    </li>
                  </div>
                ),
            },
          ]}
        />
      ))}
    </div>
  );
};
