import { toast } from "react-toastify";
import axiosInstace from "../../utils/axiosInstance";

const ForgetPassword = ({ setStep, email, setEmail }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstace.post("/api/auth/send-otp", { email });
      toast.success("OTP sent to email!");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Send OTP
        </button>
      </form>
    </>
  );
};

export default ForgetPassword;
