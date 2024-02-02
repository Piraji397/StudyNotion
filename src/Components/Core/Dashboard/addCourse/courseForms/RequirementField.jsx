import React, { useEffect, useRef, useState } from "react";

const RequirementField = ({
  name,
  label,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    register(name, {
      required: {
        value: true,
        message: `${label} is required.`,
      },
      validate: {
        value: (value) => value.length > 0,
        message: `${label} is required.`,
      },
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  const handleAddrequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
      inputRef.current.focus();
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };
  return (
    <label className="w-full flex flex-col gap-1">
      <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-richblack-5">
        {label} <sup className="text-pink-200">*</sup>
      </p>
      <input
        type="text"
        name={name}
        value={requirement}
        ref={inputRef}
        onChange={(e) => setRequirement(e.target.value)}
        placeholder={placeholder}
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
        }}
        className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
      />
      {errors[name] && (
        <span className="text-pink-200 font-inter font-normal text-sm">
          {errors[name].message}
        </span>
      )}
      <button
        className="flex text-yellow-50 pl-2"
        type="button"
        onClick={handleAddrequirement}
      >
        Add
      </button>
      {requirementList.length > 0 && (
        <ul className="flex flex-col gap-1 items-start pl-2">
          {requirementList.map((requirement, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-richblack-5 text-[14px]"
            >
              <span>{requirement}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-xs text-richblack-300"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </label>
  );
};

export default RequirementField;
