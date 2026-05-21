import React, { useContext } from 'react';
import { UserContext } from '../../Dashboard/Dashboard';

function ProfileSettings() {

  const userData = useContext(UserContext);

  // ✅ fallback (important)
  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center p-6">

      <div className="bg-slate-800 rounded-2xl shadow-lg p-6 w-full max-w-md">

        {/* Profile Image */}
        <div className="flex justify-center mb-5">
          <img
            src={`http://localhost:2025/${userData.profile}`}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
          />
        </div>

        {/* Fields */}
        <div className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-400">Full Name</label>
            <input
              type="text"
              value={`${userData.firstname} ${userData.lastname}`}
              readOnly
              className="w-full bg-slate-700 px-3 py-2 rounded mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={userData.email}
              readOnly
              className="w-full bg-slate-700 px-3 py-2 rounded mt-1"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="text-sm text-gray-400">Mobile</label>
            <input
              type="text"
              value={userData.mobile}
              readOnly
              className="w-full bg-slate-700 px-3 py-2 rounded mt-1"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-gray-400">Role</label>
            <input
              type="text"
              value="Admin"
              readOnly
              className="w-full bg-slate-700 px-3 py-2 rounded mt-1"
            />
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProfileSettings;


// import React, { useState } from 'react'
// import { useContext } from 'react'
// import { UserContext } from '../../Dashboard/Dashboard'
// import './profile.css'
// function ProfileSettings() {
 
//  const userData = useContext(UserContext)
//  console.log("userdata:",userData)
//   return (
//     <div className='profile-container'>
//       <div className="profile-card">
//         <div className="profile-pic">
//           <img src={`http://localhost:2025/${userData.profile}`} alt="" />
//         </div>
//         <div className="group">
//           <label htmlFor="">Full Name</label>
//           <span>:</span>
//           <input type="text" value={userData.firstname+" "+userData.lastname}/>
//         </div>
//         <div className="group">
//           <label htmlFor="">Email</label>
//           <span>:</span>
//           <input type="mail" value={userData.email} />
//         </div>
//         <div className="group">
//           <label htmlFor="">Mobile No</label>
//           <span>:</span>
//           <input type="text" value={userData.mobile} />
//         </div>
//         <div className="group">
//           <label htmlFor="">Role</label>
//           <span>:</span>
//           <input type="text" value="Admin" />
//         </div>
        
        
//       </div>
//     </div>
//   )
// }

// export default ProfileSettings