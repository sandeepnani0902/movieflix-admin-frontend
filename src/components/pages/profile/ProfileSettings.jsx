import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../Dashboard/Dashboard'
import './profile.css'
function ProfileSettings() {
 
 const userData = useContext(UserContext)
 console.log("userdata:",userData)
  return (
    <div className='profile-container'>
      <div className="profile-card">
        <div className="profile-pic">
          <img src={`http://localhost:2025/${userData.profile}`} alt="" />
        </div>
        <div className="group">
          <label htmlFor="">Full Name</label>
          <span>:</span>
          <input type="text" value={userData.firstname+" "+userData.lastname}/>
        </div>
        <div className="group">
          <label htmlFor="">Email</label>
          <span>:</span>
          <input type="mail" value={userData.email} />
        </div>
        <div className="group">
          <label htmlFor="">Mobile No</label>
          <span>:</span>
          <input type="text" value={userData.mobile} />
        </div>
        <div className="group">
          <label htmlFor="">Role</label>
          <span>:</span>
          <input type="text" value="Admin" />
        </div>
        
        
      </div>
    </div>
  )
}

export default ProfileSettings