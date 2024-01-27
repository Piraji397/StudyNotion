import React, { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../common/IconBtn";

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      console.log("uploading...");
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);
  return (
    <div className="px-12 py-8 bg-richblack-800 rounded-lg border border-richblack-700">
      <div className="flex gap-5">
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[75px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-2">
          <p className="font-inter font-medium text-[16px] text-richblack-5">
            Change Profile Picture
          </p>
          <div className="flex gap-x-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              className="py-2 px-5 bg-richblack-700 rounded-md text-richblack-100 font-inter font-semibold text-[17px]"
              onClick={handleClick}
              disabled={loading}
            >
              Select
            </button>
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
              type="button"
              customClasses="py-2 px-5 bg-yellow-100  rounded-md"
            >
              {!loading && <FiUpload className="text-lg text-richblack-900" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
