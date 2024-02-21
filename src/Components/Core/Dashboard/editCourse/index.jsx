import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../utils/slices/courseSlice";
import RenderSteps from "../addCourse/RenderSteps";

const EditCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  const fetchCourseDetails = async () => {
    setLoading(true);
    const result = await getFullDetailsOfCourse(courseId, token);
    if (result?.courseDetails) {
      dispatch(setEditCourse(true));
      dispatch(setCourse(result?.courseDetails));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center text-richblack-100 font-inter font-semibold text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-7 px-[120px] py-[90px]">
      <h2 className="font-inter text-3xl font-medium text-richblack-5">
        Edit Course
      </h2>
      <div>
        {course ? (
          <RenderSteps />
        ) : (
          <p className="font-inter text-xl font-medium text-richblack-5">
            Course Not Found
          </p>
        )}
      </div>
    </div>
  );
};

export default EditCourse;
