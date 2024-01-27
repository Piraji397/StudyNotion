import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { categories } from "../apis";

const { CATEGORIES_API } = categories;

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
