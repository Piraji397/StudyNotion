import React from "react";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subHeading,
  ctaButton1,
  ctaButton2,
  codeBlock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} gap-[98px] py-[120px]`}>
      <div className="w-[45%] flex flex-col gap-3">
        {/* <div className="w-full "> */}
        {heading}
        {/* </div> */}
        <div className="font-inter font-medium text-[16px] text-richblack-300">
          {subHeading}
        </div>
        <div className="flex flex-row pt-[54px] gap-6">
          <CTAButton active={ctaButton1.active} linkto={ctaButton1.linkto}>
            <div className="flex gap-2 items-center">
              {ctaButton1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctaButton2.active} linkto={ctaButton2.linkto}>
            {ctaButton2.btnText}
          </CTAButton>
        </div>
      </div>
      <div className="w-[534px] p-8 bg-radient-ellipse-c from-[#9CECFB] from-9.12% via-[#65C7F7] via-48.59% to-[#0052D4] to-106.3%">
        <div className="flex flex-row gap-2 p-2 border bg-gradient-to-r from-[#0E1A2D] from-24% to-[#111E32] to-38%">
          <div className="font-mono font-bold text-[14px] text-center text-richblack-400">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          </div>
          <div
            className={`flex flex-col gap-2 font-mono font-bold pr-2 text-[14px] ${codeColor}`}
          >
            <TypeAnimation
              sequence={[codeBlock, 10000, ""]}
              repeat={Infinity}
              omitDeletionAnimation={true}
              cursor={true}
              style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
