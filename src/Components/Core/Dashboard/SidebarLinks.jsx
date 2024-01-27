import React from "react";
import * as Icons from "react-icons/vsc";
import { NavLink, useLocation } from "react-router-dom";

const SideberLinks = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();

  return (
    <NavLink
      to={link.path}
      className={`${
        link.path === location.pathname
          ? "border-l border-l-yellow-50 bg-yellow-800 text-yellow-50"
          : "text-richblack-300"
      } flex py-2 px-7 items-center gap-3 self-stretch transition-all duration-200`}
    >
      <Icon className="w-[18px] h-[18px]" />
      <p className="font-inter text-[15px] font-medium leading-[22px]">
        {link.name}
      </p>
    </NavLink>
  );
};

export default SideberLinks;
