import React, { useRef, useState } from 'react';
import './register.css';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  validateforminput,
  checkPasswordStrength
} from './validation';

function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
    profile: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
    profile: ""
  });

  const [valid, setValid] = useState({
    firstname: false,
    lastname: false,
    email: false,
    mobile: false,
    password: false,
    confirmpassword: false,
  });

  const [strength, setStrength] = useState(0);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const profileRef = useRef();
  const navigate = useNavigate()

  /* ------------------------- HANDLE TEXT INPUT -------------------------- */
  function handleInput(e) {
    const { name, value } = e.target;

    // Auto-format mobile input
    if (name === "mobile") {
      let cleaned = value.replace(/\D/g, "");
      if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);

      let formatted = cleaned;
      if (cleaned.length > 3) formatted = cleaned.slice(0, 3) + "-" + cleaned.slice(3);
      if (cleaned.length > 6) formatted = formatted.slice(0, 7) + "-" + cleaned.slice(6);

      validateforminput(name, cleaned, form, setForm, setError, setValid);
      e.target.value = formatted;
      return;
    }

    // Password strength tracking
    if (name === "password") {
      const strengthLevel = checkPasswordStrength(value);
      setStrength(strengthLevel);
    }

    validateforminput(name, value, form, setForm, setError, setValid);
  }


  /* ------------------------ HANDLE IMAGE UPLOAD ------------------------- */
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSizeMB = 2;

    if (!allowedTypes.includes(file.type)) {
      setError(prev => ({ ...prev, profile: "Only JPG, PNG or WEBP allowed" }));
      return;
    }

    if (file.size / 1024 / 1024 > maxSizeMB) {
      setError(prev => ({ ...prev, profile: "Image must be under 2MB" }));
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    setForm(prev => ({ ...prev, profile: file }));
    setError(prev => ({ ...prev, profile: "" }));
  }


  /* ------------------------------ SUBMIT ------------------------------- */
  
  async function handleForm(e) {
    e.preventDefault();

    let hasError = false;

    Object.keys(form).forEach(key => {
      if (!form[key]) {
        hasError = true;
        setError(prev => ({ ...prev, [key]: `Please enter ${key}` }));
      }
    });
      if (hasError) return;

    setLoading(true);
     const formData = new FormData()
       
    try {
     setLoading(false);
     Object.entries(form).forEach( ([key,value]) => {
      formData.append(key, value)
      
    })
  
    const res = await fetch("http://localhost:2025/movieflix/register", {
      method:"POST",
      body:formData
     })
     const data = await res.json()
     if(!data?.message){
      alert("successfully registered")
      navigate("/login")
     }     
     else{
      alert("user already existed")
     }          
    } catch (err) {
      
      setLoading(false);
      console.error(err)
      // alert("Submit failed");
    }
  }


  /* ------------------------------- JSX -------------------------------- */
  return (
    <div className='Register'>
      <div className='form-block'>
        <form onSubmit={handleForm}>

          {/* PROFILE UPLOAD */}
          <div className='profile'>
            <div className='image-block'>
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                />
              ) : (
                <svg width="32" height="29" viewBox="0 0 32 29" fill="none">
                  <path d="M26.1818..." fill="black" />
                </svg>
              )}
              <p className='error'>{error.profile}</p>
            </div>

            <div className='file-upload-loc'>
              <input
                type="file"
                accept="image/*"
                name="profile"
                id="profile"
                ref={profileRef}
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <label htmlFor="profile">Upload Image</label>
            </div>
          </div>


          {/* FIRST NAME */}
          <div id='field'>
            <label>First Name:</label>
            <div>
              <input
                type="text"
                name="firstname"
                placeholder="Enter First Name"
                onChange={handleInput}
                className={
                  error.firstname
                    ? "error-input"
                    : valid.firstname
                      ? "valid-input"
                      : ""
                }
              />
              <p className='error'>{error.firstname}</p>
            </div>
          </div>


          {/* LAST NAME */}
          <div id='field'>
            <label>Last Name:</label>
            <div>
              <input
                type="text"
                name="lastname"
                placeholder="Enter Last Name"
                onChange={handleInput}
                className={
                  error.lastname ? "error-input" :
                    valid.lastname ? "valid-input" : ""
                }
              />
              <p className='error'>{error.lastname}</p>
            </div>
          </div>


          {/* EMAIL */}
          <div id='field'>
            <label>Email:</label>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                onChange={handleInput}
                className={
                  error.email ? "error-input" :
                    valid.email ? "valid-input" : ""
                }
              />
              <p className='error'>{error.email}</p>
            </div>
          </div>


          {/* MOBILE */}
          <div id='field'>
            <label>Mobile No:</label>
            <div>
              <input
                type="text"
                name="mobile"
                placeholder="123-456-7890"
                onChange={handleInput}
                className={
                  error.mobile ? "error-input" :
                    valid.mobile ? "valid-input" : ""
                }
              />
              <p className='error'>{error.mobile}</p>
            </div>
          </div>


          {/* PASSWORD */}
          <div id='field'>
            <label>Password:</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                onChange={handleInput}
                className={
                  error.password ? "error-input" :
                    valid.password ? "valid-input" : ""
                }
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? "👁️" : "🙈"}
              </span>

              {/* PASSWORD STRENGTH BAR */}
              <div className="strength-bar">
                <div
                  className="strength-fill"
                  style={{
                    width:
                      strength === 0 ? "0%" :
                      strength === 1 ? "25%" :
                      strength === 2 ? "50%" :
                      strength === 3 ? "75%" : "100%",
                    background:
                      strength <= 1 ? "red" :
                      strength === 2 ? "orange" :
                      strength === 3 ? "yellowgreen" : "green"
                  }}
                ></div>
              </div>

              <p className='error'>{error.password}</p>
            </div>
          </div>


          {/* CONFIRM PASSWORD */}
          <div id='field'>
            <label>Confirm Password:</label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmpassword"
                placeholder="Re-enter Password"
                onChange={handleInput}
                className={
                  error.confirmpassword ? "error-input" :
                    valid.confirmpassword ? "valid-input" : ""
                }
              />

              <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword(prev => !prev)}
              >
                {showConfirmPassword ? "👁️" : "🙈"}
              </span>

              <p className='error'>{error.confirmpassword}</p>
            </div>
          </div>


          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            id="sign-btn"
            disabled={loading || !Object.values(valid).every(v => v === true)}
            style={{
              opacity: loading || !Object.values(valid).every(v => v === true) ? 0.6 : 1,
              cursor: loading ? "wait" : "pointer"
            }}
          >
            {loading ? "Processing..." : "Register"}
          </button>

          <div id='sign_in'>
            <span>Already have an account? </span>
            <NavLink to="/login">Sign In</NavLink>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Register;









// import React, { useRef, useState } from 'react';
// import axios from 'axios';
// import './register.css';
// import {  NavLink, useNavigate } from 'react-router-dom';
// import { validateform, validateforminput } from './validation';
// import { useEffect } from 'react';
// function Register({setProfile}) {
//   // const navigate= useNavigate()

  
//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmpassword: "",
//     profile: null, // store actual File object, not name
//   });

//   const [preview, setPreview] = useState(null);
//   const [error, setError] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmpassword: ""
//   });
//   const profileRef = useRef();
//   // const [newerror, setNewerror] = useState({})
 
//   // useEffect(()=>{
    
//   // })

//   function handleInput(e) {
   
//     const {name, value} =  e.target
//     // setForm( prev => ({...prev, [name]:value}))
    
//     validateforminput(name, value,form, setForm, setError)
//   }

 
//   function handleImageUpload(e) {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       console.log(imageUrl)
//       setPreview(imageUrl);
//       setForm((prev) => ({ ...prev, profile: file }));
//     }
//   }



//  function handleForm(e) {
//     e.preventDefault()
//     let hasError = false
//     Object.keys(form).forEach(key =>
//     {
//       if( form[key]  == ''){
//         setError(prev => ({...prev, [key]:`please enter ${key}`}))
//         hasError = true
//       }  
//       if(!hasError){
//         console.log('form submitted')
//       }
//     }
//      )
    
//   }

//   return (
//     <div className='Register'>
//       <div className='form-block'>
//         <form onSubmit={handleForm}>

//           <div className='profile'>
//             <div className='image-block'>
//               {preview ? (
//                 <img
//                   src={preview}
//                   alt="Profile"
//                   style={{ width: "100px", height: "100px", borderRadius: "50%" }}
//                   className="profile-image"
//                 />
//               ) : (
//                 <svg id="camera" width="32" height="29" viewBox="0 0 32 29" fill="none"
//                   xmlns="http://www.w3.org/2000/svg">
//                   <path d="M26.1818 8.7V5.8H23.2727V2.9H26.1818V0H29.0909V2.9H32V5.8H29.0909V8.7H26.1818ZM14.5455 23.925C16.3636 23.925 17.9093 23.2909 19.1825 22.0226C20.4558 20.7543 21.0919 19.2135 21.0909 17.4C21.0899 15.5865 20.4538 14.0461 19.1825 12.7788C17.9113 11.5115 16.3656 10.8769 14.5455 10.875C12.7253 10.8731 11.1801 11.5077 9.90982 12.7788C8.63952 14.05 8.00291 15.5904 8 17.4C7.99709 19.2096 8.6337 20.7505 9.90982 22.0226C11.1859 23.2947 12.7312 23.9289 14.5455 23.925ZM14.5455 21.025C13.5273 21.025 12.6667 20.6746 11.9636 19.9737C11.2606 19.2729 10.9091 18.415 10.9091 17.4C10.9091 16.385 11.2606 15.5271 11.9636 14.8262C12.6667 14.1254 13.5273 13.775 14.5455 13.775C15.5636 13.775 16.4242 14.1254 17.1273 14.8262C17.8303 15.5271 18.1818 16.385 18.1818 17.4C18.1818 18.415 17.8303 19.2729 17.1273 19.9737C16.4242 20.6746 15.5636 21.025 14.5455 21.025ZM2.90909 29C2.10909 29 1.42448 28.7163 0.855273 28.1488C0.286061 27.5814 0.000969697 26.8985 0 26.1V8.7C0 7.9025 0.285091 7.22003 0.855273 6.6526C1.42545 6.08517 2.11006 5.80097 2.90909 5.8H7.49091L10.1818 2.9H20.3636V8.7H23.2727V11.6H29.0909V26.1C29.0909 26.8975 28.8063 27.5804 28.2371 28.1488C27.6679 28.7172 26.9828 29.001 26.1818 29H2.90909Z"
//                     fill="black" />
//                 </svg>
//               )}
//               <p className='error'>{error?.name}</p>
//             </div>
//             <div className='file-upload-loc'>
//               <input
//                 type="file"
//                 accept='image/*'
//                 name='profile'
//                 id="profile"
//                 ref={profileRef}
//                 onChange={handleImageUpload}
//                 style={{ display: "none" }}
//               />
//               <label htmlFor="profile">Upload Image</label>
//             </div>
//           </div>

//           {/* Text Fields */}
//           <div id='field'>
//             <label>First Name <span>:</span></label>
//             <div>
//                <input
//               type="text"
//               name='firstname'
//               placeholder='Enter First Name'
//               onChange={handleInput}
              
              
//             />
//             <p className='error'>{error?.firstname}</p>
//             </div>
           
//           </div>

//           <div id='field'>
//             <label>Last Name <span>:</span></label>
//             <div>
//                <input
//               type="text"
//               name='lastname'
//               placeholder='Enter Last Name'
//               onChange={handleInput}
//               // value={form.lastname}
              
//             />
//              <p className='error'>{error?.lastname }</p>
//             </div>
           
//           </div>

//           <div id='field'>
//             <label>Email <span>:</span></label>
//             <div>
//               <input
//               type="text"
//               name='email'
//               placeholder='Enter Email'
//               onChange={handleInput}
//               // value={form.email}
              
//             />
//              <p className='error'>{error?.email}</p>
//             </div>
            
//           </div>

//           <div id='field'>
//             <label>Mobile No <span>:</span></label>
//             <div>
//               <input
//               type="text"
//               name='mobile'
//               placeholder='Enter Mobile Number'
//               onChange={handleInput}
//               // value={form.mobile}
              
//             />
//              <p className='error'>{error?.mobile}</p>
//             </div>
            
//           </div>

//           <div id='field'>
//             <label>Password <span>:</span></label>
//             <div>
//              <input type="text"
//                 name='password'
//                 placeholder='enter password'
//                 onChange={handleInput}
//              />
//             <p className='error'>{error?.password}</p>
//             </div>
           
//           </div>

//           <div id='field'>
//             <label>Confirm Password <span>:</span></label>
//             <div>
//               <input
//               type="text"
//               name='confirmpassword'
//               placeholder='Re-enter Password'
//               onChange={handleInput}
//               // value={form.confirmpassword}
              
//             />
//             <p className='error'>{error?.confirmpassword}</p>
//             </div>
            
//           </div>

//           <button type='submit' id='sign-btn'>Register</button>

//           <div id='sign_in'>
//             <span>Already have an account? </span>
//             <NavLink to="/login" >Sign In</NavLink>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;
