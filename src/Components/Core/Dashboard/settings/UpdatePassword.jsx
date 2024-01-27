import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../common/IconBtn";

const UpdatePassword = () => {
  const { token } = useSelector((state) => state.auth);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { oldPassword, newPassword } = passwordData;

  const handleOnChangePassword = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmitPassword = () => {
    console.log("passwordData", passwordData);
    dispatch(updatePassword(oldPassword, newPassword, token, navigate));
  };
  return (
    <div className="flex flex-col gap-y-10">
      <div className="px-12 py-8 bg-richblack-800 rounded-lg border border-richblack-700 flex flex-col gap-8">
        <p className="font-inter text-[18px] font-semibold leading-[22px] text-richblack-5">
          Password
        </p>
        <form className="flex w-full flex-col gap-y-8">
          <div className="flex gap-x-6 w-full">
            <label className="relative flex flex-col gap-2 w-[50%]">
              <p className="mb-1 text-[1rem] leading-[0.500rem]  text-richblack-5">
                Current Password
              </p>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                value={oldPassword}
                onChange={handleOnChangePassword}
                placeholder="Enter Current Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.22)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[30px] z-10 cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <label className="relative flex flex-col gap-2 w-[50%]">
              <p className="mb-1 text-[1rem] leading-[0.500rem]  text-richblack-5">
                New Password
              </p>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={handleOnChangePassword}
                placeholder="Enter New Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.22)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[30px] z-10 cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-end gap-x-4">
        <IconBtn
          text="Cancel"
          onclick={() => navigate("/dashboard/my-profile")}
          customClasses="px-5 py-2 rounded-md bg-richblack-700 text-richblack-100"
        />
        <IconBtn
          text="Update"
          onclick={handleOnSubmitPassword}
          customClasses="px-5 py-2 rounded-md bg-yellow-100 text-richblack-900"
        />
      </div>
    </div>
  );
};

export default UpdatePassword;
