import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        phoneNo: "",
        message: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitContactForm = async (data) => {
    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col items-start gap-9 self-stretch">
        <div className="flex flex-col items-start gap-5 self-stretch">
          <div className="flex items-start gap-5 self-stretch">
            <label className="flex flex-col items-start gap-[6px] flex-1 flex-shrink-0">
              <p className="font-inter text-[14px] font-normal leading-[22px] text-richblack-5">
                First Name
              </p>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                {...register("firstName", { required: true })}
                style={{
                  boxShadow: "0px -1px 0px rgba(255,255,255,0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
              {errors.firstName && (
                <span className="text-[#fd1d1dd6] pl-2">
                  First name is required
                </span>
              )}
            </label>
            <label className="flex flex-col items-start gap-[6px] flex-1 flex-shrink-0">
              <p className="font-inter text-[14px] font-normal leading-[22px] text-richblack-5">
                Last Name
              </p>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                {...register("lastName")}
                style={{
                  boxShadow: "0px -1px 0px rgba(255,255,255,0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
            </label>
          </div>
          <label className="w-full flex flex-col items-start gap-[6px] flex-1 flex-shrink-0">
            <p className="font-inter text-[14px] font-normal leading-[22px] text-richblack-5">
              Email Address
            </p>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              {...register("email", { required: true })}
              style={{
                boxShadow: "0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            {errors.email && (
              <span className="text-[#fd1d1dd6] pl-2">
                Please enter valid email
              </span>
            )}
          </label>
          <label className="w-full flex flex-col items-start gap-[6px] flex-1 flex-shrink-0">
            <p className="font-inter text-[14px] font-normal leading-[22px] text-richblack-5">
              Phone Number
            </p>
            <div className="w-full flex items-end gap-5 self-stretch">
              <select
                name="dropdown"
                id="dropdown"
                {...register("countrycode", { required: true })}
                className="w-[20%] flex py-[15px] px-3 items-center gap-3 rounded-[0.5rem] bg-richblack-800  text-richblack-200"
              >
                {CountryCode.map((ele, index) => (
                  <option key={index} value={ele.code}>
                    {ele.code} - {ele.country}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="phoneNo"
                id="phoneNo"
                placeholder="12345 67890"
                {...register("phoneNo", {
                  required: { value: true, message: "Phone no is required" },
                  maxLength: { value: 10, message: "Phone must be 10 digits" },
                  minLength: { value: 10, message: "Phone must be 10 digits" },
                })}
                style={{
                  boxShadow: "0px -1px 0px rgba(255,255,255,0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
            </div>
            {errors.phoneNo && (
              <span className="text-[#fd1d1dd6] pl-2">
                {errors.phoneNo.message}
              </span>
            )}
          </label>
        </div>
        <label className="w-full flex flex-col items-start gap-[6px] self-stretch">
          <p className="font-inter text-[14px] font-normal leading-[22px] text-richblack-5">
            Message
          </p>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter message here"
            {...register("message", { required: true })}
            style={{
              boxShadow: "0px -1px 0px rgba(255,255,255,0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
          {errors.message && (
            <span className="text-[#fd1d1dd6] pl-2">Message is required</span>
          )}
        </label>
        <button
          type="submit"
          className="w-full flex p-3 justify-center items-center self-stretch rounded-lg bg-yellow-50 text-richblack-900"
          style={{
            boxShadow: "-0.5px -1.5px 0px 0px rgba(0,0,0,0.12) inset",
          }}
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
