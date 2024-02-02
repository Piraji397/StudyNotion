import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GrAddCircle } from "react-icons/gr";
import IconBtn from "../../../../common/IconBtn";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(false);

  const cancelEdit = () => {
    setEditSectionName(false);
    setValue("sectionName", "");
  };

  return (
    <div className="flex flex-col items-start p-6 gap-[26px] rounded-lg border border-richblack-700 bg-richblack-800">
      <h2 className="font-inter font-semibold text-[24px] leading-8 text-richblack-5">
        Course Builder
      </h2>
      <form className="w-full flex flex-col items-start gap-[26px]">
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
    </div>
  );
};

export default CourseBuilderForm;
