import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const { editCourse, course } = useSelector((state) => state.course);
  const [tagList, setTagList] = useState([]);
  useEffect(() => {
    if (editCourse) {
      setTagList(course?.tag);
    }

    register(name, {
      required: {
        value: true,
        message: `${label} is required.`,
      },
    });
  }, []);

  useEffect(() => {
    setValue(name, tagList);
    // console.log(tagList);
  }, [tagList]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      let tag = e.target.value.trim();
      if (tag && !tagList.includes(tag)) {
        setTagList([...tagList, tag]);
        e.target.value = "";
      }
    }
  };

  const handleRemoveTag = (index) => {
    const updatedTagList = [...tagList];
    updatedTagList.splice(index, 1);
    setTagList(updatedTagList);
  };
  return (
    <label className="relative w-full flex flex-col gap-1">
      <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-richblack-5">
        {label} <sup className="text-pink-200">*</sup>
      </p>
      {tagList.length > 0 && (
        <div className="w-full flex flex-wrap items-start gap-2 p-1">
          {tagList.map((tag, index) => (
            <span
              key={index}
              className="font-inter font-semibold text-[16px] text-richblack-900 px-3 py-1 rounded-full bg-richblack-300 flex gap-x-2 items-center"
            >
              {tag}
              <button type="button" onClick={() => handleRemoveTag(index)}>
                <RxCross2 className="cursor-pointer" />
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        type="text"
        name={name}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full form-style"
      />
      {errors[name] && (
        <span className="text-pink-200 font-inter font-normal text-sm">
          {errors[name].message}
        </span>
      )}
    </label>
  );
};

export default ChipInput;
