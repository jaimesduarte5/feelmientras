import React from "react";

const MeetingCardHome = ({ meeting }) => {
  const { urlImgMeet, dateMeet, hourEndMeet, hourIniMeet, urlMeet, meetName } =
    meeting;

  return (
    <div
      className=" h-96 w-64 bg-cover bg-top p-4 rounded-md flex flex-col justify-end items-center py-4 hover:scale-95 transition-transform ease-in-out"
      style={{
        backgroundImage: `url(${urlImgMeet})`,
      }}
    >
      <p className="text-white text-lg font-bold uppercase text-center">
        {meetName}
      </p>
      <p className="text-white text-sm my-2">{dateMeet.substring(0, 10)}</p>
      <p className="text-white text-xs mb-4">
        {hourIniMeet} - {hourEndMeet}
      </p>
      <a href={urlMeet} target="_blank">
        <span className="bg-primaryPink rounded-md text-white py-2 px-8 mb-4  text-center hover:bg-opacity-80 hover:scale-95 font-bold transition ease-in-out  duration-200 ">
          Check in
        </span>
      </a>
    </div>
  );
};

export default MeetingCardHome;
