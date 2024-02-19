import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseBuilderForm from "./courseForms/CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./courseForms/CourseInformation/CourseInformationForm";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-7">
        <div className="relative flex">
          {steps.map((item) => (
            <div
              className="flex flex-col z-20 gap-y-2 items-center flex-[1_0_0]"
              key={item.id}
            >
              <p
                className={`flex justify-center items-center w-[38px] h-[38px] p-[2px] rounded-full border ${
                  step === item.id
                    ? "text-yellow-50 bg-yellow-900  border-yellow-50"
                    : "text-richblack-300 bg-richblack-800 border-richblack-700"
                } ${
                  step > item.id
                    ? "bg-yellow-50 text-yellow-900 border-yellow-50"
                    : ""
                }`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </p>
              <p
                className={`font-inter text-[14px] font-normal leading-[22px] ${
                  step === item.id || step > item.id
                    ? "text-richblack-5"
                    : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
          ))}
          <div
            className={`absolute left-[112px] top-[03px] h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
              step > 1 ? "border-yellow-100" : "border-richblack-500"
            }`}
          ></div>
          <div
            className={`absolute right-[112px] top-[03px] h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
              step > 2 ? "border-yellow-100" : "border-richblack-500"
            }`}
          ></div>
        </div>
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {/* {step === 3 && <PublishCourseForm />} */}
      </div>
    </>
  );
};

export default RenderSteps;
