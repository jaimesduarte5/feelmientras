import React from "react";

const CircularProgress = ({
  progress = 50,
  title = "Progress",
  stroke = "#f5f0f0",
  color = "#f5d200",
  strokeWidth = 4,
  progressWidth = 8,
}) => {
  return (
    <div className="bg-gradient-to-tr to-primaryPink from-primaryPurple flex p-4 justify-around items-center flex-col relative w-48 min-h-[16rem]  rounded-lg ">
      <h2 className=" font-semibold text-sm text-white  text-center">
        {title}
      </h2>
      <div className="relative  flex justify-center items-center">
        <svg className="relative w-40 h-40">
          <circle
            cx={70}
            cy={70}
            r={70}
            className={`w-36 h-36 fill-none  translate-x-2 translate-y-2`}
            style={{
              strokeDasharray: 440,
              strokeDashoffset: `calc(440 - (440 * 100) / 100)`,
              stroke: stroke,
              MozStroke: stroke,
              strokeWidth,
              MozStrokeWidth: strokeWidth,
            }}
          ></circle>
          <circle
            cx={70}
            cy={70}
            r={70}
            className={`w-36 h-36 fill-none  translate-x-2 translate-y-2`}
            style={{
              strokeDasharray: 440,
              strokeLinecap: "round",
              strokeDashoffset: `calc(440 - (440 * ${progress}) / 100)`,
              stroke: color,
              MozStroke: color,
              strokeWidth: progressWidth,
              MozStrokeWidth: progressWidth,
            }}
          ></circle>
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <h2 className="text-2xl text-white font-semibold">
            {progress.toFixed(0)}
            <span className="font-normal text-sm">%</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
