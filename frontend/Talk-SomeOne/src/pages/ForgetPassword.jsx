import React, { useState } from 'react'
import PasswordInput from "../../components/PasswordInput";
// import axiosInstace from '../../utils/axiosInstance';


const ForgetPassword = () => {
    const [email, setEmail] = useState("")

    const handleChange = (e) =>{
        setEmail(e.target.value)
    }
    
    // const handelForgetPassword = async () =>{
    //     try{
    //         const response = await axiosInstace.post("/api/auth/forget-password",)
    //     }
    // }
  return (
    <>
      <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-200">
        <div className="flex flex-col items-center justify-center bg-gray-100 shadow-md border-gray-200 rounded-lg p-8 w-full max-w-sm">
          <h1 className="text-gray-800 text-2xl font-bold text-center mb-6">
            Forget Password
          </h1>
          <form  className="flex flex-col gap-1">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
              placeholder="Enter Username or Email"
              className="rounded-full py-2 px-4 pr-10 mb-3 focus:outline-none border border-gray-600 w-full focus:ring-1 focus:ring-black"
              required
            />
            <button className="bg-blue-500 hover:bg-blue-600 hover:rounded-full rounded-md transition-all duration-300   text-white font-semibold py-2  ">
             Next
            </button>
          </form>
          <div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword