import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import axiosInstace from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [form , setform ] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handelSubmit = async (e) =>{
      e.preventDefault();
       try{
          const response = await axiosInstace.post("/api/auth/signup",form);
          const {token} = response.data;

          localStorage.setItem("token",token);

          toast.success("Account Created",{
            autoClose:1000
          })

          navigate("/")
       } catch(error){
          toast.error(error.response.data.message,{
            autoClose:1000
          })
       }
    }

    const handleChanges = (e)=>{
        setform({...form,[e.target.name] : e.target.value})
    }
  return (
    <>
      <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-200">
        <div className="flex flex-col items-center justify-center bg-gray-100 shadow-md border-gray-200 rounded-lg p-8 w-full max-w-sm">
          <h1 className="text-gray-800 text-2xl font-bold text-center mb-6">
            Login
          </h1>
          <form className="flex flex-col gap-1" onSubmit={handelSubmit}>
            <input
              type="name"
              name="name"
              value={form.name}
              onChange={handleChanges}
              placeholder="Enter Username "
              className="rounded-full py-2 px-4 pr-10 mb-3 focus:outline-none border border-gray-600 w-full focus:ring-1 focus:ring-black"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChanges}
              placeholder="Enter Email"
              className="rounded-full py-2 px-4 pr-10 mb-3 focus:outline-none border border-gray-600 w-full focus:ring-1 focus:ring-black"
              required
            />
           <PasswordInput value={form.password} onChange={handleChanges} name={"password"}/>
            <a className="flex flex-row justify-end text-sm mt-0 mb-4 text-blue-500 font-medium " href="/forget-password">
              Forget Password
            </a>
            <button className="bg-blue-500 hover:bg-blue-600 hover:rounded-full rounded-md transition-all duration-300   text-white font-semibold py-2  ">Login</button>
          </form>
        <div>
            <span>Aready have account </span>
            {/* <a href="/login" className="text-blue-500 hover:text-blue-600 font-medium mt-4"> Login</a> */}
            <button onClick={()=> navigate("/login")} className="text-blue-500 hover:text-blue-600 font-medium mt-4 ">Login</button>
        </div>
        </div>
      </div>
    </>
  );
};

export default Login;
