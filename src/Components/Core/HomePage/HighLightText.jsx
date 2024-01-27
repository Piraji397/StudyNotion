import React from "react";

const HighLightText = ({ text }) => {
  return (
    <span
      className={`font-bold font-mono inline-block bg-gradient-to-b from-[#1FA2FF] -from-3.62% via-[#12D8FA] via-50.44% to-[#A6FFCB] to-104-51% text-transparent bg-clip-text`}
    >
      {text}
    </span>
  );
};

export default HighLightText;
