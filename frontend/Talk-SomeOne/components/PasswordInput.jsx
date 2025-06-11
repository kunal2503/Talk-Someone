import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = ({ value, onChange, name, id }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        id={id}
        onChange={onChange}
        placeholder="Enter your password"
        className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        aria-label="Password"
      />

      <div
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-3 flex items-center text-xl text-gray-500 cursor-pointer"
        aria-label="Toggle password visibility"
      >
        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </div>
    </div>
  );
};

export default PasswordInput;
