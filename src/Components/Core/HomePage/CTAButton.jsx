import React from "react";
import { Link } from "react-router-dom";

const CTAButton = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`px-6 py-3 font-inter font-medium text-lg text-center rounded-lg shadow-[2px_2px_0_0_rgba(255,255,255,0.18)] ${
          active
            ? "bg-yellow-50 text-richblack-900"
            : "bg-richblack-800 text-richblack-5"
        } hover:scale-95 transition-all duration-200`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
