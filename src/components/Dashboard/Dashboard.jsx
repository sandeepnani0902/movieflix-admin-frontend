import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  Suspense,
  lazy
} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import dropdownImg from "../../assets/dropdown.svg";

const Sidebar = lazy(() => import("../sidebar/Sidebar"));

export const UserContext = createContext(null);

function Dashboard() {

  const [userData, setUserData] = useState(null); // ✅ FIX
  const [checkdropdown, setCheckdropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // ✅ FIX
  const [collapsed, setCollapsed ] = useState(false)

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const BASE_URL = "http://localhost:2025";

  /* ---------------- Fetch Data ---------------- */
  useEffect(() => {
    fetch(`${BASE_URL}/movieflix/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUserData(data.data))
      .catch(err => console.error(err));
  }, []);

  /* ---------------- Responsive Fix ---------------- */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------------- Outside Click ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCheckdropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- Handlers ---------------- */
  const logout = () => {
    if (window.confirm("Logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const rotate = checkdropdown ? "180deg" : "0deg";

  /* ---------------- Loader ---------------- */
  // if (!userData) {
  //   return (
  //     <div className="h-screen flex justify-center items-center bg-slate-900 text-white">
  //       Loading Dashboard...
  //     </div>
  //   );
  // }

  /* ---------------- JSX ---------------- */
  return (
    <UserContext.Provider value={userData}>
  <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden">

    {/* HEADER */}
    <div className="flex justify-between items-center px-6 py-4 bg-slate-800">
      <h2 className="text-xl font-bold">Movie Flix</h2>
      {/* profile + dropdown */}
      {/* <div>
        <select name="" id="">
          <option value=""></option>
        </select>
      </div> */}
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
    
    {/* Profile Image */}
    <img
      src={
        userData?.profile
          ? `${BASE_URL}/${userData.profile}`
          : "/default-avatar.png"
      }
      alt="profile"
      onError={(e) => (e.target.src = "/default-avatar.png")}
      className="w-10 h-10 rounded-full object-cover border cursor-pointer"
      onClick={() => setCheckdropdown(prev => !prev)}
    />

    {/* Name + Arrow */}
    <div
      onClick={() => setCheckdropdown(prev => !prev)}
      className="flex items-center bg-red w-35 gap-3 cursor-pointer"
    >
      <span>{userData?.firstname || "User"}</span>
      <img
        src={dropdownImg}
        alt="dropdown"
        className="w-5 text-white"
        style={{
          transform: `rotate(${checkdropdown ? "180deg" : "0deg"})`,
          transition: "0.3s"
        }}
      />
    </div>
    </div>
    {/* Dropdown */}
    {checkdropdown && (
      <ul className="absolute right-5 top-20 bg-slate-700 shadow rounded w-40 z-50">
        <li className="px-4 py-2 border-b">
          {userData?.firstname} {userData?.lastname}
        </li>

        <li
          className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
          onClick={() => {
            console.log("navigate to profile settins")
            navigate("/dashboard/profilesettings")}}
        >
          View Profile
        </li>

        <li
          className="px-4 py-2 hover:bg-red-600 cursor-pointer"
          onClick={logout}
        >
          Logout
        </li>
      </ul>
    )}
    </div>

    {/* MAIN */}
    <div className="flex flex-1 overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } bg-slate-800`}
      >
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </Suspense>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 overflow-y-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>

    </div>

    {/* FOOTER */}
    {!isMobile && (
      <footer className="text-center py-2 bg-slate-800 text-gray-400">
        ramanasoftnocopyrights@2025
      </footer>
    )}
    
  </div>
</UserContext.Provider>

  //   <UserContext.Provider value={userData}>
  //     <div className="min-h-screen  text-white flex flex-col">

  //       {/* HEADER */}
  //       <div className="flex justify-between items-center px-6 py-4 bg-blue-800 shadow">

  //         <h2 className="text-xl font-bold">Movie Flix</h2>

  //         <div className="flex items-center gap-3">

  //           {/* Profile */}
  //           <img
  //             src={userData?.profile ? `${BASE_URL}/${userData?.profile}` : "/default-avatar.png"}
  //              alt="profile"
  //             onError={(e) => (e.target.src = "/default-avatar.png")} // ✅ fallback
  //             className="w-10 h-10 rounded-full object-cover border"
  //           />

  //           {/* Dropdown */}
  //           <div className="relative" ref={dropdownRef}>
  //             <div
  //               onClick={() => setCheckdropdown(prev => !prev)}
  //               className="flex items-center gap-2 cursor-pointer"
  //             >
  //               <span>{userData?.firstname}</span>
  //               <img
  //                 src={dropdownImg}
  //                 style={{
  //                   transform: `rotate(${rotate})`,
  //                   transition: "0.3s"
  //                 }}
  //               />
  //             </div>

  //             {checkdropdown && (
  //               <ul className="absolute right-0 mt-2 bg-slate-800 shadow rounded w-40">
  //                 <li className="px-4 py-2 border-b">
  //                   {userData?.firstname} {userData?.lastname}
  //                 </li>

  //                 <li
  //                   className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
  //                   onClick={() => navigate("/dashboard/profilesettings")}
  //                 >
  //                   Profile
  //                 </li>

  //                 <li
  //                   className="px-4 py-2 hover:bg-red-600 cursor-pointer"
  //                   onClick={logout}
  //                 >
  //                   Logout
  //                 </li>
  //               </ul>
  //             )}
  //           </div>
  //         </div>
  //       </div>

  //       {/* MAIN */}
  //       <div className="flex flex-1">

  //         {/* Sidebar */}
  //         {/* <div className="w-64 hidden md:block ">
  //           <Suspense fallback={<div>Loading Sidebar...</div>}>
  //             <Sidebar />
  //           </Suspense>
  //         </div> */}
  //          <div
  //   className={`transition-all duration-300 ${
  //     collapsed ? "w-20" : "w-64"
  //   } bg-slate-900`}
  // >
  //   <Suspense fallback={<div>Loading Sidebar...</div>}>
  //     <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
  //   </Suspense>
  // </div>

  //         {/* Content */}
  //         {/* <div className="flex-1 p-4 overflow-auto">
  //           <Suspense fallback={<div>Loading...</div>}>
  //             <Outlet />
  //           </Suspense>
  //         </div> */}
  //          <div className="flex-1 p-4 overflow-auto transition-all duration-300">
  //   <Suspense fallback={<div>Loading...</div>}>
  //     <Outlet />
  //   </Suspense>
  // </div>

  //       </div>

  //       {/* Footer */}
  //       {!isMobile && (
  //         <footer className="text-center py-3 bg-blue-800 text-gray-400">
  //           ramanasoftnocopyrights@2025
  //         </footer>
  //       )}

  //     </div>
  //   </UserContext.Provider>
  );
}

export default Dashboard;



// import React, {
//   createContext,
//   useEffect,
//   useState,
//   useRef,
//   Suspense,
//   lazy
// } from "react";
// import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
// import dropdownImg from "../../assets/dropdown.svg";
// import "./dashboard.css";

// const Sidebar = lazy(() => import("../sidebar/Sidebar"));
// // import { useNetwork } from "../../hooks/useNetwork";

// export const UserContext = createContext(null);

// function Dashboard() {
//   const [userData, setUserData] = useState({});
//   const [checkdropdown, setCheckdropdown] = useState(false);
//   const [menu, setMenu] = useState(false);

//   //checking online status

//   // const online = useNetwork()
 
//   // useEffect(()=>{
    
  
//   // },[online])

//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const token = localStorage.getItem("token");
//   const { username = "Guest User", profile = "" } = location.state || {};

//   const BASE_URL = "http://localhost:2025";
//   const profilePic = `${BASE_URL}/uploads/profile/${profile}`;

//   /* ---------------- Fetch Dashboard Data ---------------- */
//   useEffect(() => {

//     fetch("http://localhost:2025/movieflix/dashboard", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setUserData(data.data))
//       .catch((err) => console.error(err));

//   }, []);

//   /* ---------------- Close Dropdown on Outside Click ---------------- */
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setCheckdropdown(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   /* ---------------- Handlers ---------------- */
//   const handleDropDown = () => {
//     setCheckdropdown((prev) => !prev);
//   };

//   const viewProfile = (e) => {
//     e.preventDefault();
//     setCheckdropdown(false);
//     navigate("/dashboard/profilesettings");
//   };

//   const logout = (e) => {
//     e.preventDefault();
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.removeItem("token");
//       navigate("/login");
//     }
//   };

//   const handletoggle = () => {
//     setMenu((prev) => !prev);
//   };

//   const rotate = checkdropdown ? "180deg" : "0deg";

//   /* ---------------- JSX ---------------- */
//   return (
//     <UserContext.Provider value={userData}>
//       <div className="dashboard-container">
//         {/* -------- Header -------- */}
//         <div className="dashboard-header">
//           <div className="logo">
//             <h2>Movie Flix</h2>
//           </div>

//           <div className="user-section">
//             <div className="profile-circle">
//               {userData.profile ? (
//                 <img
//                   src={`http://localhost:2025/${userData.profile}`}
//                   alt="Profile"
//                   className="profile-image"
//                 />
//               ) : (
//                 "🕵️‍♀️"
//               )}
//             </div>

//             {/* -------- Dropdown -------- */}
//             <div className="dropdown" ref={dropdownRef}>
//               <div className="selectDropDown" onClick={handleDropDown}>
//                 <span className="activedropdown">View DropDown</span>
//                 <img
//                   src={dropdownImg}
//                   alt="Dropdown"
//                   style={{
//                     transform: `rotate(${rotate})`,
//                     transition: "transform 0.3s ease",
//                   }}
//                 />
//               </div>

//               {checkdropdown && (
//                 <ul className="dropdown-content">
//                   <li>{userData.firstname} {userData.lastname}</li>
//                   <li onClick={viewProfile}>View Profile</li>
//                   <li onClick={logout}>Logout</li>
//                 </ul>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* -------- Main -------- */}
//         <div className="dashboard-main">
//           <div className="menu" onClick={handletoggle}>
//             <i className="bi bi-list"></i>
//           </div>

//           <div className="sidebar-block">
//             <Suspense fallback={<div>Loading Sidebar...</div>}>
//               <Sidebar />
//             </Suspense>
//           </div>

//           <div className="dashboard-content">
//             <Suspense fallback={<div>Loading Content...</div>}>
//               <Outlet />
//             </Suspense>
//           </div>
//         </div>
//       {/* mobile version  */}
//        {window.innerWidth <= 768 ? "" : <footer>ramanasoftnocopyrights@2025</footer>}
//       </div>
//     </UserContext.Provider>
//   );
// }

// export default Dashboard;
