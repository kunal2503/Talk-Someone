import { toast } from "react-toastify";
import axiosInstace from "../utils/axiosInstance";

const VerifyOtp = ({ setStep, email, otp, setOtp }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstace.post("/api/auth/verify-otp", { email, otp });
      toast.success("OTP verified!");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Enter OTP</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2"
          placeholder="Enter the 6-digit OTP"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Verify OTP
        </button>
      </form>
    </>
  );
};

export default VerifyOtp;
