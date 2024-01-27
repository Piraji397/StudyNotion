import React from "react";
import ContactUsForm from "../../common/ContactUsForm";

const ContactFormSection = () => {
  return (
    <section className="px-[420px] pt-[90px] flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col justify-center items-center gap-6">
        <p className="font-inter text-[36px] font-semibold leading-[44px] -tracking-[0.72px] text-richblack-5">
          Get in Touch
        </p>
        <p className="font-inter text-[16px] font-normal leading-6 text-richblack-300">
          We’d love to here for you, Please fill out this form.
        </p>
      </div>
      <div className="flex p-8 flex-col items-start gap-9 items-stretch">
        <ContactUsForm />
      </div>
    </section>
  );
};

export default ContactFormSection;
