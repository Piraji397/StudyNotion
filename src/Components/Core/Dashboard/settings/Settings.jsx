import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../services/operations/settingsAPI";
import ConfirmModal from "../../../common/ConfirmModal";
import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

const Settings = () => {
  const { token } = useSelector((state) => state.auth);

  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAccountDelete = () => {
    dispatch(deleteAccount(token, navigate));
  };

  return (
    <div>
      <div className="mx-auto flex flex-col gap-12 py-10 px-[80px] self-stretch">
        <h1 className="font-inter font-medium text-3xl text-richblack-5">
          Edit Profile
        </h1>
        <div className="flex flex-col gap-y-10 w-full self-stretch">
          <ChangeProfilePicture />
          <EditProfile />
          <UpdatePassword />
          <DeleteAccount
            setConfirmationModal={setConfirmationModal}
            handleAccountDelete={handleAccountDelete}
          />
        </div>
      </div>
      {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
    </div>
  );
};

export default Settings;
