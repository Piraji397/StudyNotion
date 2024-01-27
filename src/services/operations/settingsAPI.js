import { toast } from "react-hot-toast";
import { setLoading, setUser } from "../../utils/slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateProfileData(
  dateOfBirth,
  gender,
  contactNumber,
  about,
  token,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        UPDATE_PROFILE_API,
        {
          dateOfBirth,
          gender,
          contactNumber,
          about,
        },
        { Authorization: `Bearer ${token}` }
      );
      console.log("UPDATE_PROFILE_API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Updated Successfully");
      dispatch(setUser(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("UPDATE_PROFILE_API ERROR............", error);
      toast.error("Could not update Profile");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function updatePassword(oldPassword, newPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        CHANGE_PASSWORD_API,
        {
          oldPassword,
          newPassword,
          confirmNewPassword: newPassword,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("CHANGE_PASSWORD_API Response.....", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password Changed Successfully");
      navigate("/dashboard/my-profile");
    } catch (error) {
      toast.error("Could not changed the password");
      console.log("CHANGE_PASSWORD_API error.....", error);
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_PROFILE_API,
        {},
        { Authorization: `Bearer ${token}` }
      );
      console.log("DELETE_PROFILE_API Response....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Account Deleted Successfully");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log("DELETE_PROFILE_API Error.....", error);
      toast.error("Could not delete account");
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("UPDATE_DISPLAY_PICTURE_API Response....", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    } finally {
      toast.dismiss(toastId);
    }
  };
}
