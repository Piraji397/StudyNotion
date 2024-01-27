import { toast } from "react-hot-toast";
import { setLoading } from "../../utils/slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API } =
  profileEndpoints;

export async function getEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_USER_ENROLLED_COURSES_API Response......", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Enrolled Courses Fetched Successfully");
    result = response.data.data;
  } catch (error) {
    toast.error("Could not fetched enrolled courses data");
    console.log("GET_USER_ENROLLED_COURSES_API Error", error);
  } finally {
    toast.dismiss(toastId);
  }
}
