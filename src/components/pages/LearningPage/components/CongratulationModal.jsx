import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useEffect, useState } from "react";

export const CongratulationsModal = ({ onClose, avatar, username }) => {
  useEffect(() => {
    createConfetti();
  }, []);

  const createConfetti = () => {
    const confettiContainer = document.getElementById("confetti-container");
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDuration = `${2 + Math.random() * 3}s`;
      confettiContainer.appendChild(confetti);
    }
  };
  return (
    <div className="complete-course-card">
      <div id="confetti-container"></div>
      <div className="complete-course-title-container">
        <h1 className="complete-course-title">Congratulations!</h1>
      </div>
      <p className="complete-course-subtitle">
        You've successfully completed the course!
      </p>

      <div className="complete-course-image-container">
        <div className="complete-course-image-frame">
          <img src={avatar} alt="User" className="complete-course-image" />
        </div>
      </div>

      <h2 className="complete-course-username">{username}</h2>
      <p className="complete-course-message">
        You are now certified! Keep up the great work and continue learning!
      </p>

      <button className="complete-course-button" onClick={onClose}>
        View Certificate
      </button>
    </div>
  );
};
