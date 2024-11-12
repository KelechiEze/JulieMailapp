import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/send" className={location.pathname === "/send" ? "active" : ""}>
              Send Bulk Emails
            </Link>
          </li>
          <li>
            <Link to="/settings" className={location.pathname === "/settings" ? "active" : ""}>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
