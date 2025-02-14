import { Link } from "react-router-dom";

export const Favourite = ({ role }) => {
  return (
    role === "USER" && (
      <div className="nav-item  mx-2">
        <Link
          to="/favourite"
          style={{ width: "40px", height: "40px" }}
          className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
        >
          <i className="fa-solid fa-heart " style={{ color: "red" }}></i>
        </Link>
      </div>
    )
  );
};
