import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-3.5rem)]">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-[508px] p-8 flex flex-col gap-6 bg-richblack-900">
          <div className="flex flex-col gap-3">
            <h1 className="font-inter font-semibold text-3xl leading-[38px] text-richblack-5">
              Choose new password
            </h1>
            <p className="font-inter font-normal text-[18px] leading-[26px] text-richblack-100">
              Almost done. Enter your new password and youre all set.
            </p>
          </div>

          <form onSubmit={handleOnSubmit} className="flex flex-col gap-6 ">
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-[6px]">
                <p className="font-inter font-normal text-[14px] leading-[22px] text-richblack-5">
                  New password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter password"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
              <label className="flex flex-col gap-[6px]">
                <p className="font-inter font-normal text-[14px] leading-[22px] text-richblack-5">
                  Confirm new password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="password"
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Enter password"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
            </div>
            {/* <div></div> */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="rounded-[8px] p-3 bg-yellow-50 font-medium font-inter text-[16px] leading-6 text-center text-richblack-900"
              >
                Reset Password
              </button>
              <Link to="/login">
                <div className="rounded-lg text-left flex items-center gap-1">
                  <BsArrowLeft className="w-[18px] text-richblack-5" />
                  <p className="font-inter font-medium text-[16px] leading-6 text-richblack-5">
                    Back to Login
                  </p>
                </div>
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
