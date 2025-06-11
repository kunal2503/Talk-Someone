import React, { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/login", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.data.user && response.data.user.id) {
        localStorage.setItem("userId", response.data.user.id);
      }

      toast.success("Login Successful!", { autoClose: 1000 });
      navigate(`/`);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login Failed", {
        autoClose: 1000,
      });
    }
  };

  const handleChanges = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-sm text-gray-500">
          Login to your account to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="email">Email</label>
            <input
            id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChanges}
              placeholder="example@email.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="password">Password</label>
            <PasswordInput
              id="password"
              value={form.password}
              onChange={handleChanges}
              name="password"
            />
          </div>

          {/* Forgot Link */}
          <div className="flex justify-end text-sm">
            <a
              href="/forget-password"
              className="text-blue-600 hover:underline hover:text-blue-700 transition"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="text-sm text-center text-gray-500">Don’t have an account?</div>

        {/* Register Button */}
        <button
          onClick={() => navigate("/signup")}
          className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
