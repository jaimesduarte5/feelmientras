import React from "react";

const ProgressCourses = ({
  progress = 0,
  stroke = "#f5f0f0",
  color = "#FF0082",
  strokeWidth = 2,
  progressWidth = 4,
}) => {
  return (
    <div className="flex p-4 justify-center items-center flex-col relative w-48 rounded-lg">
      <div className="relative  flex justify-center items-center">
        <svg className="relative w-28 h-28">
          <circle
            cx={50}
            cy={50}
            r={50}
            className={`w-36 h-36 fill-none  translate-x-2 translate-y-2`}
            style={{
              strokeDasharray: 314,
              strokeDashoffset: `calc(314 - (314 * 100) / 100)`,
              stroke: stroke,
              strokeWidth,
            }}
          ></circle>
          <circle
            cx={50}
            cy={50}
            r={50}
            className={`w-24 h-24 fill-none  translate-x-2 translate-y-2`}
            style={{
              strokeDasharray: 314,
              strokeLinecap: "round",

              strokeDashoffset: `calc(314 - (314 * ${progress}) / 100)`,
              stroke: color,
              strokeWidth: progressWidth,
            }}
          ></circle>
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <h2 className="text-lg text-white font-semibold">
            {progress.toFixed(0)}
            <span className="font-normal text-xs">%</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProgressCourses;
