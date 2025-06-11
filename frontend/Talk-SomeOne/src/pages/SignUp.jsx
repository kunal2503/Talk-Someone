import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/signup", form);
      const { token, id, user } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", id);
      localStorage.setItem("token", token);

      toast.success("Account created successfully!", { autoClose: 1000 });
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup Failed", {
        autoClose: 1000,
      });
    }
  };

  const handleChanges = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Create Account 🚀
        </h2>
        <p className="text-center text-sm text-gray-500">
          Join us and start your Talk
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="name">Name</label>
            <input
            id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChanges}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="email">Email</label>
            <input
            id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChanges}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Navigation */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline hover:text-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
