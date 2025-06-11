// components/RequestOTP.jsx
import React, { useState } from 'react';

const RequestOTP = ({ onNext }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger API to send OTP
    // Example: await axios.post("/api/auth/send-otp", { email });
    onNext(email); // Move to OTP screen
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm text-gray-600">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Send OTP
      </button>
    </form>
  );
};

export default RequestOTP;
