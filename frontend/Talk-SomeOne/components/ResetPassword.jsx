import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstace from "../utils/axiosInstance";

const ResetPassword = ({ email, otp }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axiosInstace.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword: password,
      });
   
      toast.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2"
          placeholder="Enter new password"
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
