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
        localStorage.setItem("userId", response.data.user.id); // Store user ID in localStorage
      }

      toast.success("Login Successfull !", {
        autoClose: 1000,
      });
      navigate(`/`)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Login Failed", {
        autoClose: 1000,
      });
    }
  };

  const handleChanges = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-200">
        <div className="flex flex-col items-center justify-center bg-gray-100 shadow-md border-gray-200 rounded-lg p-8 w-full max-w-sm">
          <h1 className="text-gray-800 text-2xl font-bold text-center mb-6">
            Login
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-1">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChanges}
              placeholder="Enter Username or Email"
              className="rounded-full py-2 px-4 pr-10 mb-3 focus:outline-none border border-gray-600 w-full focus:ring-1 focus:ring-black"
              required
            />
            <PasswordInput
              value={form.password}
              onChange={handleChanges}
              name={"password"}
            />
            <a
              className="flex flex-row justify-end text-sm mt-0 mb-4 text-blue-500 font-medium "
              href="/forget-password"
            >
              Forget Password
            </a>
            <button className="bg-blue-500 hover:bg-blue-600 hover:rounded-full rounded-md transition-all duration-300   text-white font-semibold py-2  ">
              Login
            </button>
          </form>
          <div>
            <span>Don`t have an account</span>
            {/* <a href="/signup" className="text-blue-500 hover:text-blue-600 font-medium mt-4"> Register</a> */}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:text-blue-600 font-medium mt-4"
            >
              {" "}
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
