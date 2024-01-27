import React from "react";

const stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];
const Stats = () => {
  return (
    <section className="px-[120px] py-[90px] flex justify-center items-start gap-[10px] border-b-richblack-700 bg-richblack-800">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center gap-3 flex-1 flex-shrink-0"
        >
          <p className="font-inter text-3xl font-bold leading-[38px] text-richblack-5">
            {stat.count}
          </p>
          <p className="font-inter text-[16px] font-semibold leading-6 text-richblack-500">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Stats;
