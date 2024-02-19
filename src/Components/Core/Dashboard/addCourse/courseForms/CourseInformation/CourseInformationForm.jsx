import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../../services/operations/courseDetailsAPI";
import { setCourse, setStep } from "../../../../../../utils/slices/courseSlice";
import IconBtn from "../../../../../common/IconBtn";
import ChipInput from "./ChipInput";
import RequirementField from "./RequirementField";
import { SlArrowRight } from "react-icons/sl";
import Upload from "../../Upload";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../../utils/constants";

const CourseInformationForm = () => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [courseCategories, setCourseCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const getCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();
    if (categories.length > 0) {
      setCourseCategories(categories);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCategories();

    if (editCourse) {
      console.log("course data", course);
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseCategories ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
      // currentValues.courseImage !== course.thumbnail
    )
      return true;
    else return false;
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValue = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValue.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValue.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValue.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValue.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValue.courseCategory !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        if (currentValue.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }

        if (currentValue.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }

        if (
          currentValue.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made in form");
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("thumbnailImage", data.courseImage);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);
    console.log("Api called...");

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    setLoading(false);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start p-6 gap-[26px] rounded-lg border border-richblack-700 bg-richblack-800"
    >
      <label className="w-full flex flex-col gap-1">
        <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-richblack-5">
          Course Title <sup className="text-pink-200">*</sup>
        </p>
        <input
          type="text"
          name="courseTitle"
          {...register("courseTitle", {
            required: { value: true, message: "Course title is required" },
          })}
          placeholder="Enter Course Title"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
        />
        {errors.courseTitle && (
          <span className="text-pink-200 font-inter font-normal text-sm">
            {errors.courseTitle.message}
          </span>
        )}
      </label>
      <label className="w-full flex flex-col gap-1">
        <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-richblack-5">
          Course Short Description <sup className="text-pink-200">*</sup>
        </p>
        <textarea
          type="text"
          name="courseShortDesc"
          {...register("courseShortDesc", {
            required: {
              value: true,
              message: "Course Short Description is required",
            },
          })}
          placeholder="Enter Short Description"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
        />
        {errors.courseShortDesc && (
          <span className="text-pink-200 font-inter font-normal text-sm">
            {errors.courseShortDesc.message}
          </span>
        )}
      </label>
      <label className="relative w-full flex flex-col gap-1">
        <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-richblack-5">
          Price <sup className="text-pink-200">*</sup>
        </p>
        <input
          type="text"
          name="coursePrice"
          {...register("coursePrice", {
            required: { value: true, message: "Course Price is required" },
            valueAsNumber: {
              value: true,
              message: "Only numbers are allowed.",
            },
          })}
          placeholder="Enter Course Price"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px]
          pl-9 text-richblack-5"
        />
        <HiOutlineCurrencyRupee className="absolute top-[42%] left-2 text-richblack-500 w-[22px] h-[22px]" />
        {errors.courseShortDesc && (
          <span className="text-pink-200 font-inter font-normal text-sm">
            {errors.coursePrice.message}
          </span>
        )}
      </label>
      <label className="w-full flex flex-col gap-1">
        <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-richblack-5">
          Category <sup className="text-pink-200">*</sup>
        </p>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", {
            required: { value: true, message: "Course Category is required" },
          })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px]
          pl-[6px] text-richblack-5"
        >
          <option value="" disabled>
            Choose a category
          </option>
          {!loading &&
            courseCategories.map((category) => (
              <option value={category?._id} key={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="text-pink-200 font-inter font-normal text-sm">
            {errors.courseCategory.message}
          </span>
        )}
      </label>
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press enter or comma(,)"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <Upload
        name="courseImage"
        label="Choose Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      <label className="w-full flex flex-col gap-1">
        <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-richblack-5">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </p>
        <textarea
          type="text"
          name="courseBenefits"
          {...register("courseBenefits", {
            required: {
              value: true,
              message: "Course benefits is required",
            },
          })}
          placeholder="Enter Course Benefits"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
        />
        {errors.courseBenefits && (
          <span className="text-pink-200 font-inter font-normal text-sm">
            {errors.courseBenefits.message}
          </span>
        )}
      </label>
      <RequirementField
        name="courseRequirements"
        label="Requirements / Instructions"
        placeholder="Enter Benefits of the course"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <div className="w-full flex justify-end gap-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="px-4 py-2 bg-richblack-400 rounded-md font-inter text-pure-greys-5 text-[18px]"
          >
            Continue without saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={editCourse ? "Save and Next" : "Next"}
          customClasses="bg-yellow-50 px-4 py-2 flex justify-center items-center gap-2 rounded-lg shadow-[-2px_-2px_0px_0px_rgba(255,255,255,0.51)_inset]"
        >
          <SlArrowRight />
        </IconBtn>
      </div>
    </form>
  );
};

export default CourseInformationForm;
