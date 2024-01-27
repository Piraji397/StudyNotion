import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-3.5rem)]">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-[508px] flex flex-col gap-9 p-8 bg-richblack-900">
          <h1 className="font-inter font-semibold text-3xl text-richblack-5">
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
          </h1>
          <p className="font-inter font-normal text-[18px] leading-[26px] text-richblack-100">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="flex flex-col gap-[20px]">
                <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  style={{
                    boxShadow: "0px -1px 0px rgba(255,255,255,0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
            )}
            <button
              type="submit"
              className="w-full mt-6 rounded-[8px] bg-yellow-50 py-[8px] px[12px] font-medium text-richblack-900"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <Link to="/login">
            <div className="pt-3 rounded-lg text-left -mt-6 flex items-center gap-1">
              <BsArrowLeft className="w-[18px] text-richblack-5" />
              <p className="font-inter font-medium text-[16px] leading-6 text-richblack-5">
                Back to Login
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
