import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { categories, courseEndpoints } from "../apis";

const { CATEGORIES_API } = categories;
const {
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  COURSE_DETAILS_API,
  CREATE_RATING_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  DELETE_COURSE_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_COURSE_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  LECTURE_COMPLETION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
} = courseEndpoints;

export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", CATEGORIES_API);
    console.log("Course CATEGORIES_API Response......", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("Course CATEGORIES_API Error......", error);
    toast.error(error.message);
  }
  return result;
};

export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_COURSE_API Responnse.......", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    result = response?.data?.data;
    toast.success("Course created successfully");
  } catch (error) {
    console.log("CREATE_COURSE_API Error.......", error);
    toast.error(error.message);
  } finally {
    toast.dismiss(toastId);
  }
  return result;
};

export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("EDIT_COURSE_API Response......", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    result = response?.data?.data;
    toast.success("Course updated successfully");
  } catch (error) {
    console.log("EDIT_COURSE_API Error.......", error);
    toast.error(error.message);
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};
