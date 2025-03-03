import React from "react";

export const PostContent = ({ content, image }) => {
  return (
    <div className="px-3">
      <p className="post-content">{content}</p>
      {image && (
        <div className="post-image-container mb-3">
          <img
            src={image}
            alt="Post"
            className="post-image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};
