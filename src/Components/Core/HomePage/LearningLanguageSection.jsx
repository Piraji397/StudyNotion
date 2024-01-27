import React from "react";
import HighLightText from "./HighLightText";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./CTAButton";

const LearningLanguageSection = () => {
  return (
    <div className="w-11/12 mx-auto px-[120px] py-[90px] flex flex-col justify-center gap-[52px]">
      <div className="flex flex-col justify-center px-[220px]">
        <p className="font-inter font-semibold text-4xl text-center text-richblue-900">
          Your swiss knife for <HighLightText text={"learning any language"} />
        </p>
        <p className="font-inter font-medium text-[16px] leading-6 text-center text-richblack-700">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <img
          src={Know_your_progress}
          alt="Know Your Progress"
          className="object-contain -mr-28"
        />
        <img
          src={Compare_with_others}
          alt="Compare with others"
          className="object-contain"
        />
        <img
          src={Plan_your_lessons}
          alt="Plan your lessons"
          className="object-contain -ml-36"
        />
      </div>
      <div className="pt-9 flex justify-center">
        <CTAButton active={true} linkto={"/signup"}>
          Learn More
        </CTAButton>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
