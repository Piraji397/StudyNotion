import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import { AiOutlinePlus } from "react-icons/ai";
import CourseTable from "./InstructorCourses/CourseTable";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col gap-y-7 px-[120px] py-[90px]">
      <div className="flex justify-between items-center">
        <h2 className="font-inter text-3xl font-medium text-richblack-5">
          My Courses
        </h2>
        <IconBtn
          text={"Add Course"}
          onclick={() => navigate("/dashboard/add-course")}
          customClasses="bg-yellow-50
        px-4 py-2 flex justify-center items-center gap-2 rounded-lg outline outline-[1px]"
        >
          <AiOutlinePlus />
        </IconBtn>
      </div>
      <CourseTable
        courses={courses}
        setCourses={setCourses}
        fetchCourses={fetchCourses}
      />
    </div>
  );
};

export default MyCourses;
