import React, { useState } from "react";
import ForgetPassword from "./ForgetPassword";
import VerifyOtp from "../../components/VerifyOtp";
import ResetPassword from "../../components/ResetPassword";

const ForgetPasswordFlow = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {step === 1 && (
          <ForgetPassword setStep={setStep} email={email} setEmail={setEmail} />
        )}
        {step === 2 && (
          <VerifyOtp setStep={setStep} email={email} otp={otp} setOtp={setOtp} />
        )}
        {step === 3 && <ResetPassword email={email} otp={otp} />}
      </div>
    </div>
  );
};

export default ForgetPasswordFlow;
