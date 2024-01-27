import React, { useState } from "react";
import HighLightText from "./HighLightText";
import { HomePageExplore } from "../../../data/homepage-explore";
import { HiMiniUsers } from "react-icons/hi2";

const tagName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const Explore = () => {
  const [currentTab, setCurrentTab] = useState("Free");
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [selectedCard, setSelectedCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  function setMyCards(value) {
    setCurrentTab(value);
    let courses = HomePageExplore.find((a) => {
      return a.tag === value;
    });
    // console.log({ courses });
    // console.log({ HomePageExplore });
    setCourses(courses.courses);
    setSelectedCard(courses.courses[0].heading);
  }

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col justify-center gap-2">
        <p className="font-inter font-semibold text-[36px] leading-[44px] text-center text-richblack-5">
          Unlock the <HighLightText text={"Power of Code"} />
        </p>
        <p className="font-inter font-medium text-[16px] leading-6 text-center text-richblack-300">
          Learn to Build Anything You Can Imagine
        </p>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center w-fit mx-auto text-[16px] font-inter font-medium bg-richblack-700 py-1 px-2 rounded-full">
        {tagName.map((tag, index) => {
          return (
            <div
              className={`px-3 py-1 rounded-full ${
                currentTab === tag
                  ? "text-richblack-5 bg-richblack-900"
                  : "text-richblack-200"
              } hover:bg-richblack-900 hover:text-richblack-5 transition-all duration-200 cursor-pointer`}
              key={index}
              onClick={() => setMyCards(tag)}
            >
              {tag}
            </div>
          );
        })}
      </div>
      <div className="lg:h-[200px] pt-8 px-[52px]">
        <div className="flex flex-row gap-9">
          {courses.map((course, index) => {
            return (
              <div
                className={`flex flex-col ${
                  selectedCard === course.heading
                    ? "bg-white shadow-[12px_12px_0_0_rgba(255,214,10,1)]"
                    : "bg-richblack-800"
                }`}
                key={index}
              >
                <div className="flex flex-col pt-8 px-6 pb-[52px] gap-3">
                  <p
                    className={`font-inter font-semibold text-[20px] leading-7 ${
                      selectedCard === course.heading
                        ? "text-richblack-800"
                        : "text-richblack-5"
                    }`}
                  >
                    {course.heading}{" "}
                  </p>
                  <p
                    className={`font-inter font-normal text-[16px] leading-6 ${
                      selectedCard === course.heading
                        ? "text-richblack-500"
                        : "text-richblack-400"
                    }`}
                  >
                    {course.description}
                  </p>
                </div>
                <div
                  className={`flex flex-row justify-between gap-4 px-6 py-4 border-t border-dashed ${
                    selectedCard === course.heading
                      ? "border-richblack-50"
                      : "border-richblack-600"
                  }`}
                >
                  <div className={`flex gap-2 items-center`}>
                    <div
                      className={`w-[20px] h-[20px] ${
                        selectedCard === course.heading
                          ? "text-richblue-300"
                          : "text-richblack-300"
                      }`}
                    >
                      <HiMiniUsers />
                    </div>
                    <p
                      className={`font-inter font-medium text-[16px] leading-6 text-center ${
                        selectedCard === course.heading
                          ? "text-richblue-500"
                          : "text-richblack-300"
                      }`}
                    >
                      {course.level}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div
                      className={`w-[20px] h-[20px] ${
                        selectedCard === course.heading
                          ? "text-richblue-300"
                          : "text-richblack-400"
                      }`}
                    ></div>
                    <p
                      className={`font-inter font-medium text-[16px] leading-6 text-center ${
                        selectedCard === course.heading
                          ? "text-richblue-500"
                          : "text-richblack-300"
                      }`}
                    >
                      {course.lessionNumber} Lessons
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;
