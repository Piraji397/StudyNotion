import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { GrAddCircle } from "react-icons/gr";
import { BiRightArrow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  createSection,
  updateSection,
} from "../../../../../../services/operations/courseDetailsAPI";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../../utils/slices/courseSlice";
import IconBtn from "../../../../../common/IconBtn";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }
    if (result) {
      console.log("result", result);
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add at least one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="flex flex-col items-start p-6 gap-[26px] rounded-lg border border-richblack-700 bg-richblack-800">
      <h2 className="font-inter font-semibold text-[24px] leading-8 text-richblack-5">
        Course Builder
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start gap-[26px]"
      >
        <label className="w-full flex flex-col gap-1">
          <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-richblack-5">
            Section Name <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            name="sectionName"
            {...register("sectionName", {
              required: { value: true, message: "Section name  is required" },
            })}
            placeholder="Enter Section Name"
            className="w-full form-style"
          />
          {errors.sectionName && (
            <span className="text-pink-200 font-inter font-normal text-sm">
              {errors.sectionName.message}
            </span>
          )}
        </label>
        <div className="flex items-end gap-x-4">
          <IconBtn
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses="text-yellow-50
        px-4 py-2 flex justify-center items-center gap-2 rounded-lg outline outline-[1px]"
          >
            <GrAddCircle />
          </IconBtn>
          {editSectionName && (
            <button
              className="text-[16px] text-pure-greys-300 underline"
              onClick={cancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="w-full flex justify-end gap-x-5">
        <button
          onClick={goBack}
          className="rounded-lg px-6 py-3 bg-richblack-900 bg-opacity-50 shadow-[1px_1px_0_0_rgba(255,255,255,0.1)] font-inter font-medium text-[16px] leading-6 text-center text-richblack-5"
        >
          Back
        </button>
        <IconBtn
          text="Next"
          onclick={goToNext}
          customClasses="bg-yellow-50 text-richblack-900 
        px-4 py-2 flex justify-center items-center gap-2 rounded-lg outline outline-[1px]"
        >
          <BiRightArrow />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
