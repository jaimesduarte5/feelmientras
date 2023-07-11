import React from "react";

import { GiRotaryPhone, GiSmartphone } from "react-icons/gi";
import { TbMail, TbMessageDots } from "react-icons/tb";
import tpWhite from "../../assets/img/Tp-white-logo.png";
import gratePlace from "../../assets/img/gptw.png";
import bgbody from "../../assets/img/bg_lines.png";

const Footer = () => {
  return (
    <div
      className="min-h-48  bg-cover bg-primaryDark  "
      style={{
        backgroundImage: `url(${bgbody})`,
      }}
    >
      <div className="min-h-full min-w-full bg-primaryDark bg-opacity-60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-8 px-12">
        <div className="flex  justify-center items-center">
          <img
            src={tpWhite}
            height={50}
            width={280}
            alt="Teleperformance Logo"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src={gratePlace}
            height={120}
            width={80}
            alt="Teleperformance Logo"
          />
        </div>
        <div>
          <p className="text-primaryPink font-semibold  mb-4">
            Contact us through oup <br />
            HR Help Desck
          </p>
          <p className="text-white flex items-center text-sm">
            <span className="text-primaryPink  ">
              <GiSmartphone size={20} className="mr-2" />
            </span>{" "}
            Whatsapp 300 222 1462
          </p>
          <p className="text-white flex items-center text-sm">
            <span className="text-primaryPink">
              <GiRotaryPhone size={20} className="mr-2" />
            </span>{" "}
            601 419 7234
          </p>
        </div>
        <div>
          <p className="text-primaryPink font-semibold mb-4 sm:mb-10">
            Know all our channels
          </p>
          <div>
            <a
              href="https://tpfriend.teleperformance.co:8085/"
              className="text-green flex items-center text-sm"
              target="blank"
            >
              <span>
                <TbMessageDots size={20} className="mr-2" />
              </span>
              https://tpfriend.teleperformance.co
            </a>
            <a
              href="HRHelpDeskMAR@teleperformance.com"
              className="text-green flex items-center  text-sm"
              target="blank"
            >
              <span>
                <TbMail size={20} className="mr-2" />
              </span>
              HRHelpDeskMAR@teleperformance.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
