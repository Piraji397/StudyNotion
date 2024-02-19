import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../../../utils/constants";
import {
  resetCourseState,
  setStep,
} from "../../../../../../utils/slices/courseSlice";
import IconBtn from "../../../../../common/IconBtn";

const PublishCourse = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      goToCourses();
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);
    if (result) {
      goToCourses();
    }
    setLoading(false);
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  return (
    <div className="flex flex-col items-start p-6 gap-[26px] rounded-lg border border-richblack-700 bg-richblack-800">
      <p className="font-inter font-semibold text-[24px] leading-8 text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <label className="w-full flex flex-row gap-1">
          <input
            type="checkbox"
            name="public"
            {...register("public")}
            className="w-full form-style"
          />
          {/* {errors.sectionName && (
            <span className="text-pink-200 font-inter font-normal text-sm">
              {errors.sectionName.message}
            </span>
          )} */}
          <p className="font-inter font-medium text-[16px] leading-6 text-richblack-400">
            Make this as public
          </p>
        </label>
        <div className="flex justify-items-end gap-x-3">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex rounded-lg px-6 py-3 bg-richblack-400"
          >
            Back
          </button>
        </div>
        <IconBtn
          disabled={loading}
          text="save changes"
          customClasses="text-yellow-50
        px-4 py-2 flex justify-center items-center gap-2 rounded-lg outline outline-[1px]"
        />
      </form>
    </div>
  );
};

export default PublishCourse;
