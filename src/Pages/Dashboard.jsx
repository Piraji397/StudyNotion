import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Core/Dashboard/Sidebar";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-3.5rem)] text-richblack-5">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] overflow-auto w-[calc(100vw-222px)]">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
