import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const DeleteAccount = ({ setConfirmationModal, handleAccountDelete }) => {
  return (
    <div className="px-12 py-8 bg-pink-900 rounded-lg border border-pink-700 flex flex-row gap-[19px]">
      <div className="p-[16px] w-16 h-16 flex justify-center items-center rounded-full bg-pink-700">
        <RiDeleteBinLine className="w-8 h-8 text-pink-200" />
      </div>
      <div className="flex pr-[120px] flex-col items-start gap-2 flex-[1_0_0]">
        <h2
          className="font-inter text-[20px] font-bold leading-[26px] text-pink-5
            "
        >
          Delete Account
        </h2>
        <div className="w-[90%]">
          <p className="font-inter text-[16px] font-medium leading-[22px] text-pink-25">
            Would you like to delete account?
          </p>
          <p className="font-inter text-[16px] font-medium leading-[22px] text-pink-25">
            This account contains Paid Courses. Deleting your account will
            remove all the contain associated with it.
          </p>
        </div>
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are You Sure?",
              text2:
                " Deleting your account will remove all the contain associated with it.",
              btn1Text: "Delete",
              btn1Handler: () => handleAccountDelete(),
              btn2Text: "Cancel",
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="font-inter text-[18px] italic font-medium leading-[24px] text-pink-300"
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
