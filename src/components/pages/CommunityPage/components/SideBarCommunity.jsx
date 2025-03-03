import { div } from "framer-motion/client";
import { Form } from "react-bootstrap";
import { FaHome, FaPen, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export const SideBarCommunity = (props) => {
  const { handleSearchPost, filterQuery, setFilterQuery } = props;
  return (
    <div className="sidebar bg-dark text-light p-4">
      <Form.Group className="search-group position-relative mb-3">
        <Form.Control
          type="text"
          placeholder="Search Post"
          className="custom-search-input"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearchPost}>
          <FaSearch />
        </button>
      </Form.Group>
      <div className="sidebar-menu">
        <Link to="/community" className="custom-link">
          <div className="sidebar-item d-flex align-items-center mb-3 p-2">
            <span className="me-3">
              <FaHome />
            </span>
            <span>Dashboard</span>
          </div>
        </Link>
        <Link to="/community/my-post" className="custom-link">
          <div className="sidebar-item d-flex align-items-center mb-3 p-2">
            <span className="me-3">
              <FaPen />
            </span>
            <span>My Post</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
