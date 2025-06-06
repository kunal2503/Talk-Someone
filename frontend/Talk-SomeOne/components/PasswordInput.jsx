import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = ({ value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <div className="relative w-full max-w-sm ">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder="Enter Password"
          className="rounded-full py-2 px-4 pr-10 focus:outline-none border border-gray-600 w-full focus:ring-1 focus:ring-black"
          required
          aria-label="Password"
        />
        <div
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-3 flex items-center justify-center cursor-pointer text-gray-600"
          aria-label="Toggle password Visibility"
        >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye/>}
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
