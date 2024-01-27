import React from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import IconBtn from "../../common/IconBtn";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div>
      <div className="mx-auto flex flex-col gap-12 py-10 px-[80px] self-stretch">
        <h1 className="font-inter font-medium text-3xl text-richblack-5">
          My Profile
        </h1>
        <div className="flex flex-col gap-y-10 w-full self-stretch">
          <div className="px-12 py-8 bg-richblack-800 rounded-lg border border-richblack-700 flex justify-between items-center self-stretch">
            <div className="flex items-center gap-6">
              <img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[78px] rounded-full object-cover"
              />
              <div className="flex flex-col w-[526px] gap-[2px] items-start flex-[1_0_0]">
                <p className="font-inter font-medium text-[18px] text-richblack-5">
                  {user.firstName + " " + user.lastName}
                </p>
                <p className="font-inter text-[16px] font-normal leading-[22px] text-richblack-300">
                  {user?.email}
                </p>
              </div>
            </div>
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
              type="button"
              customClasses="py-2 px-5 bg-yellow-100  rounded-md"
            >
              {" "}
              <FaEdit />
            </IconBtn>
          </div>
          <div className="w-full px-12 py-8 bg-richblack-800 rounded-lg border border-richblack-700 flex flex-col gap-8 items-start self-stretch">
            <div className="flex justify-between items-center self-stretch">
              <h2 className="font-inter text-[18px] font-semibold leading-[26px] text-richblack-5">
                About
              </h2>
              <IconBtn
                text="Edit"
                onclick={() => navigate("/dashboard/settings")}
                type="button"
                customClasses="py-2 px-5 bg-yellow-100  rounded-md"
              >
                {" "}
                <FaEdit />
              </IconBtn>
            </div>
            <p className="font-inter font-semibold text-[14px] text-richblack-400 leading-[22px]">
              {user?.additionalDetails?.about
                ? user?.additionalDetails?.about
                : "Write Something About Yourself"}
            </p>
          </div>
          <div className="w-full px-12 py-8 bg-richblack-800 rounded-lg border border-richblack-700 flex flex-col gap-8 items-start self-stretch">
            <div className="w-full flex justify-between items-center self-stretch">
              <h2 className="font-inter text-[18px] font-semibold leading-[26px] text-richblack-5">
                Personal Details
              </h2>
              <IconBtn
                text="Edit"
                onclick={() => navigate("/dashboard/settings")}
                type="button"
                customClasses="py-2 px-5 bg-yellow-100  rounded-md"
              >
                {" "}
                <FaEdit />
              </IconBtn>
            </div>
            <div className="w-full flex flex-col gap-5 items-start">
              <div className="w-full flex items-start self-stretch">
                <div className="w-[40%] flex flex-col gap-1">
                  <p className="font-inter font-medium text-[14px] leading-6 text-richblack-500">
                    First Name
                  </p>
                  <p className="font-inter font-semibold text-[14px] text-richblack-5 leading-6">
                    {user?.firstName}
                  </p>
                </div>
                <div className="w-[40%] flex flex-col gap-1">
                  <p className="font-inter font-medium text-[14px] leading-6 text-richblack-500">
                    Last Name
                  </p>
                  <p className="font-inter font-semibold text-[14px] text-richblack-5 leading-6">
                    {user?.lastName}
                  </p>
                </div>
              </div>
              <div className="w-full flex items-start self-stretch">
                <div className="w-[40%] flex flex-col gap-1">
                  <p className="font-inter font-medium text-[14px] leading-6 text-richblack-500">
                    Email
                  </p>
                  <p className="font-inter font-semibold text-[14px] text-richblack-5 leading-6">
                    {user?.email ? user?.email : "Add Email"}
                  </p>
                </div>
                <div className="w-[40%] flex flex-col gap-1">
                  <p className="font-inter font-medium text-[14px] leading-6 text-richblack-500">
                    Phone Number
                  </p>
                  <p className="font-inter font-semibold text-[14px] text-richblack-5 leading-6">
                    {user?.additionalDetails?.contactNumber
                      ? user?.additionalDetails?.contactNumber
                      : "Add Phone Number"}
                  </p>
                </div>
              </div>
              <div className="w-full flex items-start self-stretch">
                <div className="w-[40%] flex flex-col gap-1">
                  <p className="font-inter font-medium text-[14px] leading-6 text-richblack-500">
                    Gender
                  </p>
                  <p className="font-inter font-semibold text-[14px] text-richblack-5 leading-6">
                    {user?.additionalDetails?.gender
                      ? user?.additionalDetails?.gender
                      : "Add Gender"}
                  </p>
                </div>
                <div className="w-[40%] flex flex-col gap-1">
                  <p className="font-inter font-medium text-[14px] leading-6 text-richblack-500">
                    Date Of Birth
                  </p>
                  <p className="font-inter font-semibold text-[14px] text-richblack-5 leading-6">
                    {user?.additionalDetails?.dateOfBirth
                      ? format(
                          new Date(user?.additionalDetails?.dateOfBirth),
                          "MMMM dd, yyyy"
                        )
                      : "Add Date Of Birth"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
