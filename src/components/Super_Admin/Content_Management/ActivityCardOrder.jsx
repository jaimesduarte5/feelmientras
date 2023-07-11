import React from "react";

const ActivityCardOrder = ({ nameActivity, index }) => {
  return (
    <div className="flex mt-2 items-center">
      <div className="flex flex-col">
        <div className="w-2 h-2 bg-primaryDark rounded-full" />
        <div className="w-2 h-2 bg-primaryDark rounded-full my-1" />
        <div className="w-2 h-2 bg-primaryDark rounded-full" />
      </div>
      <p className="mx-2">Act {index + 1}</p>
      <div className="flex-1 bg-primaryDark rounded-md text-white p-2">
        <p>{nameActivity}</p>
      </div>
    </div>
  );
};

export default ActivityCardOrder;
