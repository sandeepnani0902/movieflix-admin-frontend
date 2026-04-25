import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  Suspense,
  lazy
} from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import dropdownImg from "../../assets/dropdown.svg";
import "./dashboard.css";

const Sidebar = lazy(() => import("../sidebar/Sidebar"));
// import { useNetwork } from "../../hooks/useNetwork";

export const UserContext = createContext(null);

function Dashboard() {
  const [userData, setUserData] = useState({});
  const [checkdropdown, setCheckdropdown] = useState(false);
  const [menu, setMenu] = useState(false);

  //checking online status

  // const online = useNetwork()
 
  // useEffect(()=>{
    
  
  // },[online])

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const { username = "Guest User", profile = "" } = location.state || {};

  const BASE_URL = "http://localhost:2025";
  const profilePic = `${BASE_URL}/uploads/profile/${profile}`;

  /* ---------------- Fetch Dashboard Data ---------------- */
  useEffect(() => {

    fetch("http://localhost:2025/movieflix/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data.data))
      .catch((err) => console.error(err));

  }, []);

  /* ---------------- Close Dropdown on Outside Click ---------------- */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCheckdropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- Handlers ---------------- */
  const handleDropDown = () => {
    setCheckdropdown((prev) => !prev);
  };

  const viewProfile = (e) => {
    e.preventDefault();
    setCheckdropdown(false);
    navigate("/dashboard/profilesettings");
  };

  const logout = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handletoggle = () => {
    setMenu((prev) => !prev);
  };

  const rotate = checkdropdown ? "180deg" : "0deg";

  /* ---------------- JSX ---------------- */
  return (
    <UserContext.Provider value={userData}>
      <div className="dashboard-container">
        {/* -------- Header -------- */}
        <div className="dashboard-header">
          <div className="logo">
            <h2>Movie Flix</h2>
          </div>

          <div className="user-section">
            <div className="profile-circle">
              {userData.profile ? (
                <img
                  src={`http://localhost:2025/${userData.profile}`}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                "🕵️‍♀️"
              )}
            </div>

            {/* -------- Dropdown -------- */}
            <div className="dropdown" ref={dropdownRef}>
              <div className="selectDropDown" onClick={handleDropDown}>
                <span className="activedropdown">View DropDown</span>
                <img
                  src={dropdownImg}
                  alt="Dropdown"
                  style={{
                    transform: `rotate(${rotate})`,
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>

              {checkdropdown && (
                <ul className="dropdown-content">
                  <li>{userData.firstname} {userData.lastname}</li>
                  <li onClick={viewProfile}>View Profile</li>
                  <li onClick={logout}>Logout</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* -------- Main -------- */}
        <div className="dashboard-main">
          <div className="menu" onClick={handletoggle}>
            <i className="bi bi-list"></i>
          </div>

          <div className="sidebar-block">
            <Suspense fallback={<div>Loading Sidebar...</div>}>
              <Sidebar />
            </Suspense>
          </div>

          <div className="dashboard-content">
            <Suspense fallback={<div>Loading Content...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      {/* mobile version  */}
       {window.innerWidth <= 768 ? "" : <footer>ramanasoftnocopyrights@2025</footer>}
      </div>
    </UserContext.Provider>
  );
}

export default Dashboard;
