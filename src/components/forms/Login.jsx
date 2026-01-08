import React, { useEffect, useRef, useState } from 'react'
import './login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
// import bodybg from '../assets/bodybg'
function Login() {
    const [user, setUser] = useState({email:"",password:""})
    const navigate = useNavigate()
    const [showpassword, setShowpassword]  = useState(false)
    const [loading, setLoading] =useState(false)
    const [error, setError]=useState({
        email:null,
        password:null
    })
    function handleinput(e){
        const {name, value} =e.target
        setUser( {...user, [name]:value})
    }


    function handleform(e){ 
    e.preventDefault()
    setLoading(true)
    // alert("hellow")
    if(!user.email){
         setError(prev => ({...prev , ["email"]:"please enter user"}));
    }
    if(!user.password){
         setError(prev => ({...prev, ["password"]:"please enter the password"}))
    }
   
    setError({email:"", password:""})

    fetch("http://localhost:2025/movieflix/login",{
        method:"POST",
        body:JSON.stringify(user),
        headers:{"Content-Type":"application/json"}
    })
    .then(res => res.json())
    .then(data => {
        if(data?.success){
            // console.log(data)
            setLoading(false)
            alert("valid credentials :login successful")
            if(data?.token){
                localStorage.setItem("token", data.token)
            }
            
            console.log(data)
            navigate("/dashboard")
            
            // navigate('/dashboard', {state:{username:data.firstname + " " + data.lastname, profile:data.profilePic}})
        }
        else{
            // console.log(data.message)
            if(data){
                setLoading(false)
                alert(data.message)
            }
            else{
                alert("server not connected.")
            }
        }
    })
    .catch( err => {
        setLoading(false)
        alert("server error")})
   
}

function showpasswordfunction(){
 setShowpassword(!showpassword)
   
}

  return (
    <>
        <div className='login'>
            <div className='form-block'>
                <form onSubmit={handleform}>
                <h3>Sign In</h3>
                <div className='username' id='field'>
                    <label >User Name  <span>:</span></label>
                    <input type="text" placeholder='Enter User Name' name="email" value={user.username} onChange={handleinput} required/><br />
                    
                </div>
                { error.email ? <span style={{color:"red"}}> {error.email }</span>:"" }
                <div id='field'>
                    <label>Password <span>:</span></label>
                    <input type={ showpassword ? "text" : "password"} name='password' value={user.password}  placeholder='Enter Password' onChange={handleinput} required/>
                    
                </div>
                <div id='checkbox'>
                    <input type="checkbox"  onChange={showpasswordfunction} /> 
                    <label>Show password <span>{showpassword ? "👁️" : "🙈"}</span></label>
                </div>
                 { error.password ? <span style={{color:"red"}}> {error.password }</span>:"" }
                <div id='forgot-password'>
                   <a href="#">Forgot Password?</a>
                </div>
                <button type='submit' id='btn'>{ !loading ? "Sign In" : <Spinner animation="border" />} </button>
                <div className='keep-me-sign'>
                    <input type="checkbox"  />
                    <label> Keep Me Signed In</label>
                </div>
                <div id='register'>
                    <span>Don't have an account?</span>
                    <NavLink to="/register">Register Here</NavLink>
                </div>
                
                
            </form>
            </div>
        </div>
    </>

  )
}

export default Login