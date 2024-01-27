import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighLightText from "../Components/Core/HomePage/HighLightText";
import CTAButton from "../Components/Core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../Components/Core/HomePage/CodeBlocks";
import TimelineSection from "../Components/Core/HomePage/TimelineSection";
import LearningLanguageSection from "../Components/Core/HomePage/LearningLanguageSection";
import Instructor from "../Components/Core/HomePage/Instructor";
import Explore from "../Components/Core/HomePage/Explore";
import Footer from "../Components/common/Footer";

const Home = () => {
  return (
    <>
      {/* Section 1 */}
      <div className="relative mx-auto w-11/12">
        <div className="flex flex-col items-center justify-between text-white gap-[38px]">
          <Link to={"/signup"}>
            <div className="group mx-auto mt-16 p-1 rounded-full bg-richblue-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit shadow-[0_1px_0_1px_rgba(255,255,255,0.18)]">
              <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblue-900 transition-all duration-200">
                <p>Become an Instructor</p>
                <FaArrowRight />
              </div>
            </div>
          </Link>

          <div className="w-[913px] flex flex-col gap-[16px] items-center justify-center">
            <div className="text-center text-4xl font-semibold">
              Empower Your Future with <HighLightText text={"Coding Skills"} />
            </div>
            <div className="text-[16px] font-inter text-center text-richblack-300">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
              Book a Demo
            </CTAButton>
          </div>
        </div>
        <div className="mx-3 mt-20 drop-shadow-[20px_20px_0_rgba(245,245,245,1)]">
          {/* <div
          className="absolute w-[942px] h-[481px] opacity-25 left-[256px]
         -rotate-0 bg-radient-ellipse-c from-[#9CECFB] from-9.12% via-[#65C7F7] via-48.59% to-[#0052D4] to-106.3%"
        ></div> */}
          {/* <div
          className="absolute w-[992px] h-[295px] opacity-40 left-[224px]
         -rotate-0 bg-gradient-to-t from-[#9CECFB] -from-9.12% via-[#65C7F7] via-48.59% to-[#0052D4] to-106.3%"
        ></div> */}
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className="font-inter font-semibold text-4xl text-richblack-5">
              Unlock your <HighLightText text={"coding potential"} /> with our
              online courses.
            </div>
          }
          subHeading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          ctaButton1={{
            active: true,
            btnText: "Try it Yourself",
            linkto: "/signup",
          }}
          ctaButton2={{
            active: false,
            btnText: "Learn More",
            linkto: "/login",
          }}
          codeBlock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>\n</nav>`}
          codeColor={"text-richblack-50  text-[#E7BC5B]"}
        />

        <CodeBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <div className="font-inter font-semibold text-4xl text-richblack-5">
              Start <HighLightText text={"coding in seconds"} />
            </div>
          }
          subHeading={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          ctaButton1={{
            active: true,
            btnText: "Continue Lesson",
            linkto: "/signup",
          }}
          ctaButton2={{
            active: false,
            btnText: "Learn More",
            linkto: "/login",
          }}
          codeBlock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>\n</nav>`}
          codeColor={"text-richblack-50  text-[#E7BC5B]"}
        />
        {/* <div className="flex flex-col gap-9">
          <div className="flex flex-col justify-center gap-2">
            <p className="font-inter font-semibold text-[36px] leading-[44px] text-center text-richblack-5">
              Unlock the <HighLightText text={"Power of Code"} />
            </p>
            <p className="font-inter font-medium text-[16px] leading-6 text-center text-richblack-300">
              Learn to Build Anything You Can Imagine
            </p>
          </div> */}
        {/* <div className=""> */}
        <Explore />
        {/* </div> */}
        {/* </div> */}
      </div>
      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          <div className="w-11/12 max-w-maxContent flex items-center justify-center gap-5 mx-auto">
            <div className="flex pt-8 gap-6 mt-28">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex gap-2 items-center font-bold">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto px-[120px] py-[90px] flex flex-col gap-[52px]">
          <div className=" flex flex-row gap-3">
            <p className="w-[594px] font-inter font-semibold text-4xl text-richblue-900">
              Get the skills you need for a{" "}
              <HighLightText text={"job that is in demand."} />
            </p>
            <div className="w-[594px] flex flex-col gap-3">
              <p className="font-inter font-medium text-[16px] text-richblack-700">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <div className="w-full pt-9 flex">
                <CTAButton active={true} linkto={"/signup"}>
                  Learn More
                </CTAButton>
              </div>
            </div>
          </div>

          <TimelineSection />
        </div>
        {/* <div className="w-11/12 mx-auto py-[120px] px-[90px] flex flex-col justify-center gap-[52px]">
        </div> */}
        <LearningLanguageSection />
      </div>
      {/* Section 3 */}
      <div className="bg-richblack-900">
        <Instructor />
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
