import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import ConfirmModal from "../../../../../common/ConfirmModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../../utils/slices/courseSlice";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      { sectionId, courseId: course._id },
      token
    );
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubsection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId }, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      console.log("updatedCourseContent", updatedCourseContent);
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };

  return (
    <div className="w-full">
      <div className="w-full border p-6 flex flex-col gap-3 rounded-lg border-richblack-600 bg-richblack-700">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open className="w-full py-2 flex flex-col">
            <summary className="flex justify-between items-center gap-3 border-b border-b-richblack-600">
              <div className="flex items-center gap-2">
                <RxDropdownMenu className="w-5 h-5 text-richblack-400" />
                <p className="font-inter font-semibold text-[16px] leading-6 text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                  className="text-richblack-400"
                >
                  <MdEdit className="w-[16.72px] h-[16.72px]" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => confirmationModal(null),
                    })
                  }
                  className="text-richblack-400"
                >
                  <RiDeleteBin6Line className="w-5 h-5" />
                </button>
                <span className="text-richblack-400">|</span>
                <BiSolidDownArrow className="text-richblack-400 w-5 h-5" />
              </div>
            </summary>
            <div className="w-full py-2 flex flex-col pl-6">
              {section?.subSection?.map((data) => (
                <div
                  key={data._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex items-center justify-between gap-x-3 border-b border-b-richblack-600"
                >
                  <div className="flex items-center gap-x-2">
                    <RxDropdownMenu className="text-richblack-400" />
                    <p className="font-inter font-medium text-[14px] leading-[22px] text-richblack-50">
                      {data.title}
                    </p>
                  </div>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="w-[16.72px] h-[16.72px] text-richblack-400" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub Section",
                          text2: "Selected lecture  will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubsection(data._id, section._id),
                          btn2Handler: () => confirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="w-5 h-5 text-richblack-400" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setAddSubSection(section._id)}
                className="flex items-center gap-x-2 text-yellow-50"
              >
                <AiOutlinePlus />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}
      {confirmationModal ? (
        <ConfirmModal modalData={confirmationModal} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NestedView;
