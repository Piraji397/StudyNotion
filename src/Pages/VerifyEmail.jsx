import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Clock from "../assets/Images/clock.svg";
import OtpInput from "react-otp-input";
import { sendOtp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("signupData", signupData);
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-3.5rem)]">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-[508px] p-8 flex flex-col gap-6 bg-richblack-900">
          <div className="flex flex-col gap-3">
            <h1 className="font-inter font-semibold text-3xl leading-[38px] text-richblack-5">
              Verify email
            </h1>
            <p className="font-inter font-normal text-[18px] leading-[26px] text-richblack-100">
              A verification code has been sent to you. Enter the code below
            </p>
          </div>
          <form onSubmit={handleOnSubmit} className="flex flex-col gap-6">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              containerStyle={{
                display: "flex",
                gap: "12px",
              }}
              shouldAutoFocus={true}
              inputStyle={{
                width: "49px",
                height: "47px",
                backgroundColor: "#161D29",
                boxShadow: "0px 1px 0px rgba(255,255,255,0.18)",
                borderRadius: "8px",
                color: "#F1F2FF",
                // onFocus: "0px 0px 2px #E7C009",
              }}
            />
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="rounded-[8px] p-3 bg-yellow-50 font-medium font-inter text-[16px] leading-6 text-center text-richblack-900"
              >
                Verify email
              </button>
              <div className="flex justify-between">
                <Link to="/login">
                  <div className="rounded-lg text-left flex items-center gap-1">
                    <BsArrowLeft className="w-[18px] text-richblack-5" />
                    <p className="font-inter font-medium text-[16px] leading-6 text-richblack-5">
                      Back to Login
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                  className="rounded-lg text-right flex items-center gap-1"
                >
                  <img
                    src={Clock}
                    alt="timer"
                    width={18}
                    height={18}
                    className="text-richblue-100"
                  />
                  {/* <BsArrowLeft className="w-[18px] text-richblack-5" /> */}
                  <p className="font-inter font-medium text-[16px] leading-6 text-richblue-100">
                    Resend it
                  </p>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
