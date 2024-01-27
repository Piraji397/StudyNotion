import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfileData } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../common/IconBtn";

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [personalData, setPersonalData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    dateOfBirth: user?.additionalDetails?.dateOfBirth,
    gender: user?.additionalDetails?.gender,
    contactNumber: user?.additionalDetails?.contactNumber,
    about: user?.additionalDetails?.about,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { firstName, lastName, dateOfBirth, gender, contactNumber, about } =
    personalData;

  const handleOnChange = (e) => {
    setPersonalData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmitPersonalData = () => {
    dispatch(
      updateProfileData(
        dateOfBirth,
        gender,
        contactNumber,
        about,
        token,
        navigate
      )
    );
  };
  return (
    <div className="flex flex-col gap-y-10">
      <div className="px-12 py-8 bg-richblack-800 rounded-lg border border-richblack-700 flex flex-col gap-8">
        <p className="font-inter text-[18px] font-semibold leading-[22px] text-richblack-5">
          Profile Information
        </p>
        <form className="flex w-full flex-col gap-y-8">
          <div className="flex gap-x-6 w-full">
            <label className="flex flex-col gap-2 w-[50%]">
              <p className="mb-1 text-[1rem] leading-[0.500rem]  text-richblack-5">
                First Name
              </p>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter First Name"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.22)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              />
            </label>
            <label className="flex flex-col gap-2 w-[50%]">
              <p className="mb-1 text-[1rem] leading-[0.500rem]  text-richblack-5">
                Last Name
              </p>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter Last Name"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.22)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              />
            </label>
          </div>
          <div className="flex gap-x-6 w-full">
            <label className="flex flex-col gap-2 w-[50%]">
              <p className="mb-1 text-[1rem] leading-[0.500rem]  text-richblack-5">
                Date of Birth
              </p>
              <input
                type="date"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.22)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              />
            </label>
            <label className="flex flex-col gap-2 w-[50%]">
              <p className="mb-1 text-[1rem] leading-[0.500rem]  text-richblack-5">
                Gender
              </p>
              <select
                name="gender"
                onChange={handleOnChange}
                value={gender}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.22)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer Not to Say">Prefer Not to Say</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <div className="flex gap-x-6 w-full">
            <label className="flex flex-col gap-2 w-[50%]">
              <p className="mb-1 text-[1rem] leading-[0.500rem] text-richblack-5">
                Contact Number
              </p>
              <input
                type="number"
                name="contactNumber"
                value={contactNumber}
                onChange={handleOnChange}
                placeholder="Enter Contact Number"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.22)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              />
            </label>
            <label className="flex flex-col gap-2 w-[50%]">
              <p className="mb-1 text-[1rem] leading-[0.500rem] text-richblack-5">
                About
              </p>
              <input
                type="text"
                name="about"
                value={about}
                onChange={handleOnChange}
                placeholder="Enter about yourself"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.22)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
              />
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
          text="Save"
          onclick={handleOnSubmitPersonalData}
          customClasses="px-5 py-2 rounded-md bg-yellow-100 text-richblack-900"
        />
      </div>
    </div>
  );
};

export default EditProfile;
