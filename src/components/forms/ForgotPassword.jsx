import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {patterns} from './validation'
import axios from "axios";
function ForgotPassword() {
  const [email, setEmail] = useState("");

  const pattern = patterns.email

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("pattern" , pattern)
    
    if(pattern.test(email)){
      const res = await  axios.post("http://localhost:2025/movieflix/forgot-password",{email})
        if(res.data.success){
            alert("Reset link sent to your email")
        }else{
            alert("Error sending reset link")
        }
    }
    else{
        alert("password not matched")
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Forgot Password
          </h2>

          <p className="text-slate-400 mt-2 text-sm">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                bg-slate-700
                border border-slate-600
                text-white
                placeholder-slate-400
                px-4 py-3
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full
              bg-red-600
              hover:bg-red-700
              text-white
              font-semibold
              py-3
              rounded-xl
              transition
              duration-200
            "
          >
            Send Reset Link
          </button>

        </form>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <NavLink
            to="/login"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            ← Back to Login
          </NavLink>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;