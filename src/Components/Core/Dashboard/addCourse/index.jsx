import React from "react";
import RenderSteps from "./RenderSteps";

const AddCourse = () => {
  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10 flex items-start gap-x-6">
      <div className="flex flex-1 flex-col gap-y-8 items-start">
        <h1 className="font-inter text-3xl font-medium text-richblack-5">
          Add Course
        </h1>
        <div className="w-full">
          <RenderSteps />
        </div>
      </div>
      <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block text-richblack-5">
        <p className="mb-4 font-inter text-[18px] font-semibold leading-[26px]">
          ⚡Course Upload Tips
        </p>
        <ul className="space-y-4 ml-5 list-item list-disc text-sm">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  );
};

export default AddCourse;
