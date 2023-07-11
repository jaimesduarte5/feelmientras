import { useSelector } from "react-redux";
import b1 from "../../assets/img/home/b1.png";
import b2 from "../../assets/img/home/b2.png";

import CarrousselMeets from "../../components/Carroussel/CarrousselMeets";

const HomeSA = () => {
  const { userData } = useSelector((state) => state.login);
  return (
    <div className="m-4">
      <h3 className="text-white text-xl ">
        {" "}
        Hi{" "}
        <span className="font-bold">{userData.nombre.split(" ")[0] || ""}</span>
        , Good to see you!
      </h3>
      {/* NOTICE CARD */}
      <div>
        {/* BANNER CURSO */}
        <div
          className="flex flex-col justify-between h-60 mt-4 rounded-md bg-cover bg-center p-4"
          style={{
            backgroundImage: `url(${b2})`,
          }}
        >
          <div className="">
            <p className="text-white">Teleperformance Security & Compliance</p>
            <p className="text-white text-xl font-semibold mt-2">
              2023 Security New Hire and <br />
              Annual Refresh Certification
            </p>
          </div>
          <button className="rounded-md bg-primaryPink px-4 py-2 bg-opacity-75 w-44 text-white hover:bg-opacity-80 hover:scale-95 font-bold transition ease-in-out  duration-200 ">
            All ready to go
          </button>
        </div>
        {/* BANNER CURSO */}
        <div
          className="flex flex-col justify-between h-60 mt-4 rounded-md bg-cover bg-center p-4"
          style={{
            backgroundImage: `url(${b1})`,
          }}
        >
          <div className="">
            <p className="text-white text-xl font-semibold mt-2">
              2023 Teleperformance Global Anti-Corruption Training
            </p>
            <p className="text-white">Live classes in one place</p>
          </div>
          <button className="rounded-md bg-primaryPink px-4 py-2 bg-opacity-75 w-44 text-white hover:bg-opacity-80 hover:scale-95 font-bold transition ease-in-out  duration-200 ">
            Enroll now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSA;
