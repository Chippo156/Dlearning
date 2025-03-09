import { Link } from "react-router-dom";

export const Advertisement = () => {
  return (
    <div className="nav-item mx-2">
      <Link to="/my-ads">
        <button
          className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "40px", height: "40px" }}
        >
          <i className="fa-solid fa-ad"></i>
        </button>
      </Link>
    </div>
  );
};
