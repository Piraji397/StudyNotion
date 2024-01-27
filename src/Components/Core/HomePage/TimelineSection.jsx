import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    logo: Logo1,
    heading: "Leadership",
    description: "Fully committed to the success company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div className="flex flex-row items-center gap-[76px]">
      <div className="w-[410px] h-[432px] flex flex-col gap-8">
        {timeline.map((element, index) => {
          return (
            // <>
            <div
              className="flex flex-row gap-6 items-center py-4 px-3 relative"
              key={index}
            >
              <div className="w-[52px] h-[52px] rounded-full p-1 gap-1 bg-white shadow-[0px_0px_62px_0px_rgba(0,0,0,0.12)] flex justify-center items-center group">
                <img
                  src={element.logo}
                  alt={element.heading}
                  className="group-hover:animate-pulse"
                />
              </div>
              <div className="flex flex-col gap-[2px] ">
                <h3 className="font-inter font-semibold text-[18px] leading-[26px] text-richblue-800">
                  {element.heading}
                </h3>
                <p className="font-inter font-normal text-sm leading-[22px] text-richblue-700">
                  {element.description}
                </p>
              </div>
              {/* <div className="w-[42px] text-richblack-100 border border-dashed border-richblack-100 rotate-90"></div> */}
              {/* </> */}
            </div>
          );
        })}
      </div>
      <div className="relative shadow-blue-200">
        <img src={timelineImage} alt="TimelineImage" />

        <div className="absolute p-10 flex flex-row gap-[52px] bg-caribbeangreen-700 left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex gap-6">
            <p className="font-inter font-bold text-4xl leading-[44px] text-center text-white">
              10
            </p>
            <p className="font-inter font-medium text-[14px] leading-[22px] text-caribbeangreen-300 uppercase">
              YEARS EXPERIENCES
            </p>
          </div>
          <div className="w-[44px] border-r border-caribbeangreen-500"></div>
          <div className="flex gap-6">
            <p className="font-inter font-bold text-4xl leading-[44px] text-center text-white">
              250
            </p>
            <p className="font-inter font-medium text-[14px] leading-[22px] text-caribbeangreen-300 uppercase">
              Types of courses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
