import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!password.trim()) {
      return alert("Please enter new password");
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://movie-flix-product-backend.onrender.com/movieflix/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data = await res.json();

      alert(data.message);

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Reset Password
        </h2>

        <p className="text-slate-400 text-center mb-6">
          Enter your new password
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Password Input */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                bg-slate-700
                text-white
                placeholder-slate-400
                px-4
                py-3
                rounded-lg
                outline-none
                border
                border-slate-600
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-500/30
                transition
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-red-500
              hover:bg-red-600
              disabled:bg-red-400
              text-white
              font-medium
              py-3
              rounded-lg
              transition
              duration-200
            "
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ResetPassword;