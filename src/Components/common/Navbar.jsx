import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { IoChevronDownSharp } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import ProfileDropDown from "../Core/Auth/ProfileDropDown";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";

// const subLinks = [
//   { title: "Python", link: "/catalog/python" },
//   { title: "Web Devlopment", link: "/catalog/web-development" },
// ];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [setItem, getItem, removeItem] = useLocalStorage();
  const fetchSubLinks = async () => {
    try {
      const result = await fetchCourseCategories();
      console.log("result", result);
      setSubLinks(result);
    } catch (error) {
      console.log("Could not fetched the catalog list");
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className="w-screen h-14 border-b border-b-richblack-700 bg-gradient-to-r from-richblack-700  to-richblue-900 flex items-center justify-center">
      <div className="w-11/12 max-w-maxContent flex items-center justify-between gap-8">
        <Link to="/">
          <img
            src={logo}
            alt="Study Notion Logo"
            loading="lazy"
            width={160}
            height={32}
          />
        </Link>

        <nav>
          <ul className="flex gap-2 justify-center items-center">
            {NavbarLinks.map((navlink, index) => (
              <li
                key={index}
                className={`font-inter font-normal text-[16px] leading-6 py-1 px-3 text-center ${
                  navlink.path === location.pathname
                    ? "text-yellow-50"
                    : "text-richblack-50"
                }`}
              >
                {navlink.title === "Catalog" ? (
                  <div className="relative flex gap-1 justify-center items-center group cursor-pointer">
                    {navlink.title}
                    <IoChevronDownSharp />

                    <div
                      className="invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[30%] lg:w-[250px] flex flex-col px-2 py-4 rounded-md bg-richblack-5 text-richblue-900
                     opacity-0 z-10 transition-all duration-200 group-hover:visible group-hover:opacity-100"
                    >
                      <div
                        className="absolute w-6 h-6
                      bg-richblack-5 top-0 left-[50%] translate-x-[80%] translate-y-[-45%] rotate-45 -z-10"
                      ></div>
                      {subLinks?.length ? (
                        subLinks.map((sublink, index) => (
                          <Link
                            to={`/catalog/${sublink.name?.toLowerCase()}`}
                            key={sublink._id}
                          >
                            <p className="hover:bg-richblack-50 rounded-md p-1">
                              {sublink.name}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <div className="hover:bg-richblack-50 rounded-md p-1">
                          No Data Found
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={navlink.path}>{navlink.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex justify-center items-center gap-5">
          {user && user?.accountType !== "Instructor" && (
            <Link
              to="/dashboard/cart"
              className="relative w-5 h-6 text-richblack-5"
            >
              <AiOutlineShoppingCart className="w-6 h-6 text-richblack-200" />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button
                className="border
              border-richblack-700 rounded-lg text-richblack-100 bg-gradient-to-r from-richblack-700 to-richblack-800 px-3 py-2 font-inter font-medium text-[16px] leading-6 text-center"
              >
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button
                className="border
              border-richblack-700 rounded-lg text-richblack-100 bg-gradient-to-r from-richblack-700 to-richblack-800 px-3 py-2 font-inter font-medium text-[16px] leading-6 text-center"
              >
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
