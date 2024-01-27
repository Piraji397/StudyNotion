import React from "react";

const IconBtn = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={`${customClasses}`}
    >
      {children ? (
        <div className="flex gap-2 items-center">
          <span className="font-inter font-semibold text-[16px]">{text}</span>
          <span className="w-4 h-4">{children}</span>
        </div>
      ) : (
        <span className="font-inter font-semibold text-[16px]">{text}</span>
      )}
    </button>
  );
};

export default IconBtn;
