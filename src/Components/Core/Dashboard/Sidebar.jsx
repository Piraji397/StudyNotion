import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import SideberLinks from "./SidebarLinks";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
import ConfirmModal from "../../common/ConfirmModal";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (profileLoading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-3.5rem)] text-richblack-5">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="flex w-[222px] h-[calc(100vh-3.5rem)] flex-col pt-9 items-start gap-[10px] flex-shrink-0 border-r border-r-richblack-700 bg-richblack-800">
        <div className="flex flex-col w-full">
          {sidebarLinks.map((link) => {
            if (link.type && link.type !== user?.accountType) return null;
            return (
              <SideberLinks key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>
        <div className="w-[190px] mx-auto h-[1px] bg-richblack-600"></div>
        <div className="flex flex-col w-full">
          <SideberLinks
            link={{
              path: "/dashboard/settings",
              name: "Settings",
            }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you Sure?",
                text2: "You will be logged out from your account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="flex px-7 py-2 items-center gap-3 self-stretch text-richblack-300 transition-all duration-200"
          >
            <VscSignOut className="w-[18px] h-[18px]" />
            <p className="font-inter text-[14px] font-medium leading-[22px]">
              Log Out
            </p>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
