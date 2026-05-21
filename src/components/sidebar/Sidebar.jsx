import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  // const [collapsed, setCollapsed] = useState(false);

  /* ---------------- Toggle Sidebar ---------------- */
  function handletoggle(e) {
    e.preventDefault();
    setCollapsed(prev => !prev);
  }

  /* ---------------- Logout ---------------- */
  function handleUserLogedout() {
    if (window.confirm("Are you sure to logout?")) {
      localStorage.removeItem("token"); // ✅ clear token
      navigate("/login");               // ✅ redirect
    }
  }

  /* ---------------- Responsive Behavior ---------------- */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true); // mobile → collapsed
      } else {
        setCollapsed(false); // desktop → expanded
      }
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------------- Close Sidebar on Mobile Click ---------------- */
  function handleNavClick() {
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    }
  }

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""} h-full`}>

      {/* -------- Toggle Button -------- */}
      <span
        className="sidetoggle"
        style={{
          position: "absolute",
          left: collapsed ? "30px" : "225px",
          top:"90px",
          fontSize: "25px",
          fontWeight: 900,
          cursor: "pointer",
          zIndex: 1
        }}
        onClick={handletoggle}
      >
        <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"}`}></i>
      </span>

      {/* -------- Menu -------- */}
     <ul className="space-y-4  mt-5">

  <li>
    <NavLink
      to="/dashboard"
      end
      onClick={handleNavClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded transition ${
          isActive
            ? "bg-slate-600 text-white"
            : "text-gray-300 hover:bg-slate-800"
        }`
      }
    >
      <i className="bi bi-columns-gap"></i>
      <span>Dashboard</span>
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/dashboard/languages"
      onClick={handleNavClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded transition ${
          isActive
            ? "bg-slate-600 text-white"
            : "text-gray-300 hover:bg-slate-800"
        }`
      }
    >
      <i className="bi bi-translate"></i>
      <span>Languages</span>
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/dashboard/genre"
      onClick={handleNavClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded transition ${
          isActive
            ? "bg-slate-600 text-white"
            : "text-gray-300 hover:bg-slate-800"
        }`
      }
    >
      <i className="bi bi-collection-play"></i>
      <span>Genre</span>
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/dashboard/movies"
      onClick={handleNavClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded transition ${
          isActive
            ? "bg-slate-600 text-white"
            : "text-gray-300 hover:bg-slate-800"
        }`
      }
    >
      <i className="bi bi-film"></i>
      <span>Movies</span>
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/dashboard/webseries"
      onClick={handleNavClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded transition ${
          isActive
            ? "bg-slate-600 text-white"
            : "text-gray-300 hover:bg-slate-800"
        }`
      }
    >
      <i className="bi bi-tv"></i>
      <span>Web Series</span>
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/dashboard/profilesettings"
      onClick={handleNavClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded transition ${
          isActive
            ? "bg-slate-600 text-white"
            : "text-gray-300 hover:bg-slate-800"
        }`
      }
    >
      <i className="bi bi-gear"></i>
      <span>Profile Settings</span>
    </NavLink>
  </li>

</ul>

{/* Logout */}
<div className="mt-4 text-center">
  <button
    onClick={handleUserLogedout}
    className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
  >
    <i className="bi bi-box-arrow-left"></i>
    <span>Logout</span>
  </button>
</div>

    </div>
  );
}

export default Sidebar;



// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./sidebar.css";

// function Sidebar() {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);

//   function handleUserLogedout() {
//     if (window.confirm("Are you sure to logout?")) {
//       navigate("/");
//     }
//   }

//   function handletoggle(e) {
//     e.preventDefault();
//     setCollapsed((prev) => !prev);
//   }
//    useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 768) {
//         setCollapsed(false); // mobile view → false
//       }
//     };

//     handleResize(); // run once on mount
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
 
//   return (
//     <div className={`sidebar ${collapsed ? "collapsed" : ""}`} onMouseOver={()=>setCollapsed(false)} onMouseLeave={()=> setCollapsed(true)}>
//       {/* Toggle Button */}
//       <span  className="sidetoggle"
//         style={{
//           position: "absolute",
//           left: collapsed ? "30px" : "250px",
//           fontSize: "25px",
//           fontWeight: 900,
//           cursor: "pointer",
//           zIndex:1
//         }}
//         onClick={handletoggle}
//       >
//         <i
//           className={`bi ${
//             collapsed ? "bi-chevron-right" : "bi-chevron-left"
//           }`}
//         ></i>
//       </span>

//       {/* Menu */}
//       <ul>
//         <li>
//           <NavLink to="/dashboard" end>
//             <i className="bi bi-columns-gap"></i>
//             <span>Dashboard</span>
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/dashboard/languages">
//             <i className="bi bi-translate"></i>
//             <span>Languages</span>
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/dashboard/genre">
//             <i className="bi bi-collection-play"></i>
//             <span>Genre</span>
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/dashboard/movies">
//             <i className="bi bi-film"></i>
//             <span>Movies</span>
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/dashboard/webseries">
//             <i className="bi bi-tv"></i>
//             <span>Web Series</span>
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/dashboard/profilesettings">
//             <i className="bi bi-gear"></i>
//             <span>Profile Settings</span>
//           </NavLink>
//         </li>
//       </ul>

//       {/* Logout */}
//       <div className="logout">
//         <button onClick={handleUserLogedout}>
//           <i className="bi bi-box-arrow-left"></i>
//           <span> Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
