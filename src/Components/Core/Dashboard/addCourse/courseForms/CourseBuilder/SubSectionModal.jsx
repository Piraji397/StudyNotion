import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../../utils/slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "../../Upload";
import IconBtn from "../../../../../common/IconBtn";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValue = getValues();
    if (
      currentValue.lectureTitle !== modalData.title ||
      currentValue.lectureDesc !== modalData.description ||
      currentValue.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValue = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    if (currentValue.lectureTitle !== modalData.title) {
      formData.append("title", currentValue.lectureTitle);
    }
    if (currentValue.lectureDesc !== modalData.description) {
      formData.append("description", currentValue.lectureDesc);
    }
    if (currentValue.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValue.lectureVideo);
    }
    setLoading(true);
    const result = await updateSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setLoading(false);
    setModalData(null);
  };

  const onSubmit = async (data) => {
    if (view) {
      return;
    }
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No Changes made to the form");
      } else {
        handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    setLoading(true);
    const result = await createSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="absolute top-[0%] left-[0%] z-50">
      <div className="w-screen bg-richblack-300 bg-opacity-80 flex justify-center items-center">
        <div className=" rounded-lg w-[665px]">
          <div className="w-full flex justify-between items-center border-b border-b-richblack-600 py-4 px-6 gap-3 bg-richblack-700">
            <p className="font-inter font-semibold text-[18px] leading-6 text-richblack-5">
              {add && "Adding"} {view && "Viewing"} {edit && "Editing"} Lecture
            </p>
            <button onClick={() => (!loading ? setModalData(null) : "")}>
              <RxCross1 className="text-richblack-50" />
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full p-8 flex flex-col gap-6 bg-richblack-800"
          >
            <Upload
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            />
            <label className="w-full flex flex-col gap-1">
              <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-richblack-5">
                Lecture Title <sup className="text-pink-200">*</sup>
              </p>
              <input
                type="text"
                name="lectureTitle"
                {...register("lectureTitle", {
                  required: {
                    value: true,
                    message: "Lecture title  is required",
                  },
                })}
                placeholder="Enter lecture title"
                className="w-full form-style"
              />
              {errors.lectureTitle && (
                <span className="text-pink-200 font-inter font-normal text-sm">
                  {errors.lectureTitle.message}
                </span>
              )}
            </label>
            <label className="w-full flex flex-col gap-1">
              <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-richblack-5">
                Lecture Description <sup className="text-pink-200">*</sup>
              </p>
              <textarea
                type="text"
                name="lectureDesc"
                {...register("lectureDesc", {
                  required: {
                    value: true,
                    message: "Lecture descritption  is required",
                  },
                })}
                placeholder="Enter lecture description"
                className="w-full form-style"
              />
              {errors.lectureDesc && (
                <span className="text-pink-200 font-inter font-normal text-sm">
                  {errors.lectureDesc.message}
                </span>
              )}
            </label>
            <div className="w-full flex justify-end gap-[20px] bg-richblack-800">
              {!view && (
                <div>
                  <IconBtn
                    text={
                      loading ? "Loading..." : edit ? "Save Changes" : "Save"
                    }
                    customClasses="bg-yellow-50 text-richblack-900 
        px-4 py-2 flex justify-center items-center gap-2 rounded-lg outline outline-[1px]"
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubSectionModal;
