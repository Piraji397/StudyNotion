import React from "react";
import IconBtn from "./IconBtn";

const ConfirmModal = ({ modalData }) => {
  return (
    <div className="absolute top-[0%] left-[0%] z-50">
      <div
        className="w-screen h-screen bg-richblack-50
       bg-opacity-60 flex justify-center items-center"
      >
        <div className="flex flex-col w-[450px] bg-richblack-800 border border-richblack-300 rounded-lg gap-4 py-5 px-4 justify-center items-center">
          <p className="font-inter font-semibold text-2xl text-richblack-5">
            {modalData.text1}
          </p>
          <p className="font-inter font-semibold text-xl text-richblack-300 w-[90%] text-center">
            {modalData.text2}
          </p>
          <div className="flex gap-x-8">
            <IconBtn
              text={modalData?.btn1Text}
              onclick={modalData?.btn1Handler}
              customClasses="px-4 py-2 bg-yellow-50 rounded-lg  text-richblack-900 font-inter font-semibold text-[16px]"
            />
            <IconBtn
              text={modalData?.btn2Text}
              onclick={modalData?.btn2Handler}
              type="button"
              customClasses="px-4 py-2 bg-richblack-400 rounded-lg border border-richblack-50 text-richblack-900 font-inter font-semibold text-[16px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
