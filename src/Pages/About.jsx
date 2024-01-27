import React from "react";
import HighLightText from "../Components/Core/HomePage/HighLightText";
import About1 from "../assets/Images/aboutus1.webp";
import About2 from "../assets/Images/aboutus2.webp";
import About3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import CTAButton from "../Components/Core/HomePage/CTAButton";
import Stats from "../Components/Core/AboutUs/Stats";
import ContactFormSection from "../Components/Core/AboutUs/ContactFormSection";
import Footer from "../Components/common/Footer";

const About = () => {
  return (
    <div>
      {/* section 1 */}
      <section className="relative bg-richblack-800 pt-[80px] px-[120px]  w-full h-[618px] flex flex-col items-center gap-[52px]">
        <div
          className="flex flex-col justify-center
         items-center gap-[38px]"
        >
          <p className="font-inter font-medium text-[16px] leading-6 text-center text-richblack-200">
            About us
          </p>
          <div className="px-[52px] flex flex-col gap-4">
            <div className="font-inter font-semibold text-[36px] leading-[44px] text-center text-richblack-5">
              Driving Innovation in Online Education for a{" "}
              <HighLightText text={"Brighter Future"} />
            </div>
            <p className="font-inter font-medium text-[16px] leading-6 text-center text-richblack-300">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>
        </div>
        <div className="absolute -bottom-[4.5rem] flex gap-6">
          <img
            src={About1}
            alt="About us"
            loading="lazy"
            width={384}
            height={311}
          />
          <img
            src={About2}
            alt="About us"
            loading="lazy"
            width={384}
            height={311}
          />
          <img
            src={About3}
            alt="About us"
            loading="lazy"
            width={384}
            height={311}
          />
        </div>
      </section>
      {/* Quote section 2 */}
      <section className="px-[120px] py-[90px] mt-[4.5rem] border-richblack-700">
        <p className="font-inter font-semibold text-[35px] leading-[52px] text-center text-richblack-100">
          We are passionate about revolutionizing the way we learn. Our
          innovative platform <HighLightText text={"combines technology"} />,{" "}
          <span
            className={`font-bold font-mono inline-block bg-gradient-to-b from-[#FF512F] -from-4.8% to-[#F09819] to-107.46% text-transparent bg-clip-text`}
          >
            expertise
          </span>
          , and community to create an{" "}
          <span
            className={`font-bold font-mono inline-block bg-gradient-to-b from-[#E65C00] -from-6.05% to-[#F9D423] to-106.11% text-transparent bg-clip-text`}
          >
            unparalleled educational experience.
          </span>
        </p>
      </section>
      {/* Founding story section */}
      <section className="px-[120px] py-[90px] flex justify-center items-center gap-[98px]">
        <div className="flex w-[486px] flex-col items-start gap-6 flex-shrink-0">
          <div className="font-semibold font-inter text-[36px] leading-[44px] -tracking-[0.72px] inline-block bg-gradient-to-b from-[#833AB4] -from-2.4% via-[#FD1D1D] via-52.25% to-[#FCB045] to-106-89% text-transparent bg-clip-text">
            Our Founding Story
          </div>
          <div className="flex flex-col justify-start gap-4 font-inter text-[16px] font-medium leading-6 text-richblack-300">
            <p>
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p>
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
        </div>
        <div className="flex w-[534px]p-8 flex-col items-start gap-[2px] flex-shrink-0">
          <img src={FoundingStory} alt="Founding Story" className="border" />
        </div>
      </section>
      {/* vision mission section */}
      <section className="px-[120px] py-[90px] flex justify-center items-start gap-[98px]">
        <div className="flex flex-col w-[486px] items-start gap-6 flex-shrink-0">
          <p className="font-inter text-[36px] font-semibold leading-[44px] -tracking-[0.72px] bg-gradient-to-b from-[#E65C00] -from-6.05% to-[#F9D423] to-106.11% bg-clip-text text-transparent">
            Our Vision
          </p>
          <p className="font-inter text-[16px] font-normal leading-6 text-richblack-300">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content, fostering a dynamic and interactive learning
            experience.
          </p>
        </div>
        <div className="flex flex-col w-[486px] items-start gap-6 flex-shrink-0">
          <p className="font-inter text-[36px] font-semibold leading-[44px] -tracking-[0.72px]">
            <HighLightText text={"Our Mission"} />
          </p>
          <p className="font-inter text-[16px] font-normal leading-6 text-richblack-300">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content, fostering a dynamic and interactive learning
            experience.
          </p>
        </div>
      </section>
      {/* Quote section */}
      <Stats />
      {/* World class learning section */}
      <section className="px-[120px] py-[90px] flex flex-col justify-center items-end">
        <div className="flex items-start gap-[52px] self-stretch">
          <div className="flex flex-col items-start gap-3 flex-1 flex-shrink-0">
            <p className="font-inter font-semibold text-[36px] leading-[44px] text-richblack-5">
              World-Class Learning for{" "}
              <HighLightText text={"Anyone, Anywhere"} />
            </p>
            <div className="flex flex-col items-start gap-3 self-stretch">
              <p className="font-inter text-[16px] font-normal leading-6 text-richblack-300">
                Studynotion partners with more than 275+ leading universities
                and companies to bring flexible, affordable, job-relevant online
                learning to individuals and organizations worldwide.
              </p>
              <div className="flex pt-9 items-start gap-6 self-stretch">
                <CTAButton active={true} linkto={"/login"}>
                  Learn More
                </CTAButton>
              </div>
            </div>
          </div>
          <div className="w-[589px] flex items-start">
            <div className="flex h-[294px] p-8 flex-col items-center gap-8 flex-1 flex-shrink-0 bg-richblack-700">
              <p className="font-inter text-[18px] font-semibold leading-[26px] text-richblack-5">
                Curriculum Based on Industry Needs
              </p>
              <p className="font-inter text-[14px] font-normal leading-[22px] text-richblack-100">
                Save time and money! The Belajar curriculum is made to be easier
                to understand and in line with industry needs.
              </p>
            </div>
            <div className="flex h-[294px] p-8 flex-col items-start gap-8 flex-1 flex-shrink-0 bg-richblack-800">
              <p className="font-inter text-[18px] font-semibold leading-[26px] text-richblack-5 max-w-[150px]">
                Our Learning Methods
              </p>
              <p className="font-inter text-[14px] font-normal leading-[22px] text-richblack-100">
                The learning process uses the namely online and offline.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-start w-[1178px]">
          <div className="flex h-[294px] p-8 flex-col items-center gap-8 flex-1 flex-shrink-0">
            <p className="font-inter text-[18px] font-semibold leading-[26px] text-richblack-5"></p>
            <p className="font-inter text-[14px] font-normal leading-[22px] text-richblack-100"></p>
          </div>
          <div className="flex h-[294px] p-8 flex-col items-start gap-8 flex-1 flex-shrink-0 bg-richblack-700">
            <p className="font-inter text-[18px] font-semibold leading-[26px] text-richblack-5 max-w-[150px]">
              Certification
            </p>
            <p className="font-inter text-[14px] font-normal leading-[22px] text-richblack-100">
              You will get a certificate that can be used as a certification
              during job hunting.
            </p>
          </div>
          <div className="flex h-[294px] p-8 flex-col items-start gap-8 flex-1 flex-shrink-0 bg-richblack-800">
            <p className="font-inter text-[18px] font-semibold leading-[26px] text-richblack-5">
              Rating <span className="block">"Auto-grading"</span>
            </p>
            <p className="font-inter text-[14px] font-normal leading-[22px] text-richblack-100">
              You will immediately get feedback during the learning process
              without having to wait for an answer or response from the mentor.
            </p>
          </div>
          <div className="flex h-[294px] p-8 flex-col items-start gap-8 flex-1 flex-shrink-0 bg-richblack-700">
            <p className="font-inter text-[18px] font-semibold leading-[26px] text-richblack-5 max-w-[100px]">
              Ready to Work
            </p>
            <p className="font-inter text-[14px] font-normal leading-[22px] text-richblack-100">
              Connected with over 150+ hiring partners, you will have the
              opportunity to find a job after graduating from our program.
            </p>
          </div>
        </div>
      </section>
      {/* ContactFormSection */}
      <ContactFormSection />
      <Footer />
    </div>
  );
};

export default About;
