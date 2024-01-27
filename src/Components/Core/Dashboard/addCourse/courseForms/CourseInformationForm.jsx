import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";

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

  const onSubmit = async (data) => {};
  return <form onSubmit={handleSubmit(onSubmit)}></form>;
};

export default CourseInformationForm;
