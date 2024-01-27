import React from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import ContactUsForm from "../Components/common/ContactUsForm";
import Footer from "../Components/common/Footer";

const contactUsData = [
  {
    icons: (
      <HiChatBubbleLeftRight
        width={24}
        height={24}
        className="text-richblack-100"
      />
    ),
    title: "Chat on us",
    subTitle: "Our friendly team is here to help.",
    details: "@mail address",
  },
  {
    icons: (
      <BsGlobeEuropeAfrica
        width={24}
        height={24}
        className="text-richblack-100"
      />
    ),
    title: "Visit us",
    subTitle: "Come and say hello at our office HQ.",
    details: "Here is the location/ address",
  },
  {
    icons: <FaPhone width={24} height={24} className="text-richblack-100" />,
    title: "Call us",
    subTitle: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7890",
  },
];
const Contact = () => {
  return (
    <div>
      <div className="flex px-[120px] py-[90px] items-start gap-[52px]">
        <div className="flex w-[450px] p-6 flex-col items-start gap-6 rounded-xl bg-richblack-800">
          {contactUsData.map((data, index) => (
            <div
              key={data.title}
              className="flex p-3 items-start gap-[9px] self-stretch"
            >
              <div className="pt-1">{data.icons}</div>
              <div className="flex flex-col items-start h-[74px] flex-1 flex-shrink-0 gap-[2px]">
                <p className="font-inter text-[18px] font-semibold leading-[26px] text-richblack-5">
                  {data.title}
                </p>
                <p className="font-inter font-medium text-[14px] leading-[22px] text-richblack-200">
                  {data.subTitle}
                </p>
                <p className="font-inter font-semibold text-[14px] leading-[22px] text-richblack-200">
                  {data.details}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-start p-[52px] gap-8 flex-[1_0_0] rounded-lg border border-richblack-600">
          <div className="flex flex-col gap-3 items-start">
            <p className="font-inter text-[36px] font-semibold leading-[44px] -tracking-[0.72px] text-richblack-5">
              Got a Idea? We’ve got the skills. Let’s team up
            </p>
            <p className="font-inter text-[16px] font-medium leading-6 text-richblack-300">
              Tall us more about yourself and what you’re got in mind.
            </p>
          </div>
          <ContactUsForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
