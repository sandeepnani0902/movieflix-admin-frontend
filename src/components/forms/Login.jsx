import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [showpassword, setShowpassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  // 🔥 Handle Input
  function handleinput(e) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  // 🔥 Submit Form
  function handleform(e) {
    e.preventDefault();

    let errors = {
      email: "",
      password: "",
    };

    if (!user.email) {
      errors.email = "Please enter email";
    }

    if (!user.password) {
      errors.password = "Please enter password";
    }

    setError(errors);

    if (errors.email || errors.password) return;

    setLoading(true);

    fetch("https://movie-flix-product-backend.onrender.com/movieflix/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (data?.success) {
          if (data?.token) {
            localStorage.setItem("token", data.token);
          }

          navigate("/dashboard");
        } else {
          alert(data.message);
        }
      })
      .catch(() => {
        setLoading(false);
        alert("Server Error");
      });
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-[#1E293B] rounded-3xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white">
            Sign In
          </h2>

          <p className="text-slate-400 mt-2">
            Welcome back to MovieFlix
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleform} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-slate-300 mb-2 text-sm">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={user.email}
              onChange={handleinput}
              className="
                w-full
                bg-slate-700
                border border-slate-600
                text-white
                placeholder-slate-400
                px-4
                py-3
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-[#F51717]
                transition
              "
            />

            {error.email && (
              <p className="text-red-400 text-sm mt-1">
                {error.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-300 mb-2 text-sm">
              Password
            </label>

            <input
              type={showpassword ? "text" : "password"}
              name="password"
              value={user.password}
              placeholder="Enter your password"
              onChange={handleinput}
              className="
                w-full
                bg-slate-700
                border border-slate-600
                text-white
                placeholder-slate-400
                px-4
                py-3
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-[#F51717]
                transition
              "
            />

            {error.password && (
              <p className="text-red-400 text-sm mt-1">
                {error.password}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">

            {/* Show Password */}
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                onChange={() =>
                  setShowpassword(!showpassword)
                }
              />

              Show Password
            </label>

            {/* Forgot Password */}
            <NavLink
              to="/forgot-password"
              className="text-[#F51717] hover:text-red-400"
            >
              Forgot Password?
            </NavLink>

          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full
              bg-[#F51717]
              hover:bg-red-700
              text-white
              font-semibold
              py-3
              rounded-xl
              transition
              duration-200
              flex
              justify-center
              items-center
            "
          >
            {!loading ? (
              "Sign In"
            ) : (
              <Spinner animation="border" size="sm" />
            )}
          </button>

          {/* Keep Signed In */}
          <label className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
            <input type="checkbox" />

            Keep Me Signed In
          </label>

        </form>

        {/* Register */}
        <div className="text-center mt-6 text-slate-400 text-sm">
          Don't have an account?{" "}

          <NavLink
            to="/register"
            className="text-[#F51717] hover:text-red-400 font-medium"
          >
            Register Here
          </NavLink>
        </div>

      </div>
    </div>
  );
}

export default Login;