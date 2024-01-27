import React from "react";
import { FaArrowRight } from "react-icons/fa";
import InstructorImage from "../../../assets/Images/Instructor.png";
import CTAButton from "./CTAButton";
import HighLightText from "./HighLightText";

const Instructor = () => {
  return (
    <div className="w-11/12 flex flex-row gap-[52px] mx-auto px-[120px] py-[90px]">
      <div className="w-[50%] shadow-[-20px_-20px_0px_0px_rgba(255,255,255,1)]">
        <img src={InstructorImage} alt="" />
      </div>
      <div className="w-[50%] flex flex-col gap-3 justify-center">
        <p className="font-inter font-semibold text-4xl text-richblack-5 w-[50%]">
          Become an <HighLightText text={"instructor"} />
        </p>
        <p className="font-inter font-medium text-base text-richblack-300">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>
        <div className="pt-[52px] w-fit">
          <CTAButton active={true} linkto={"/signup"}>
            <div className="flex gap-2 items-center">
              start teaching today
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
