import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  function handleUserLogedout() {
    if (window.confirm("Are you sure to logout?")) {
      navigate("/");
    }
  }

  function handletoggle(e) {
    e.preventDefault();
    setCollapsed((prev) => !prev);
  }

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <span
        style={{
          position: "absolute",
          left: collapsed ? "30px" : "250px",
          fontSize: "25px",
          fontWeight: 900,
          cursor: "pointer",
          zIndex: 10
        }}
        onClick={handletoggle}
      >
        <i
          className={`bi ${
            collapsed ? "bi-chevron-right" : "bi-chevron-left"
          }`}
        ></i>
      </span>

      {/* Menu */}
      <ul>
        <li>
          <NavLink to="/dashboard" end>
            <i className="bi bi-columns-gap"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/languages">
            <i className="bi bi-translate"></i>
            <span>Languages</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/genre">
            <i className="bi bi-collection-play"></i>
            <span>Genre</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/movies">
            <i className="bi bi-film"></i>
            <span>Movies</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/webseries">
            <i className="bi bi-tv"></i>
            <span>Web Series</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/profilesettings">
            <i className="bi bi-gear"></i>
            <span>Profile Settings</span>
          </NavLink>
        </li>
      </ul>

      {/* Logout */}
      <div className="logout">
        <button onClick={handleUserLogedout}>
          <i className="bi bi-box-arrow-left"></i>
          <span> Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
