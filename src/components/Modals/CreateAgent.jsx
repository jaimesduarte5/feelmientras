import { useState } from "react";
import { BsImages } from "react-icons/bs";
import { TbDownload } from "react-icons/tb";

const CreateAgent = ({ onClose }) => {
  const [newUser, setNewUser] = useState([]);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUser = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-primaryDark w-96 p-4 rounded-md">
      <div className=" text-center my-4">
        <h3 className="text-xl font-semibold text-primaryPink "> Update</h3>
      </div>
      <div className="flex items-center">
        <button className="bg-white p-2 rounded-md text-primaryPink hover:text-white hover:bg-primaryPink transition-all ease-in-out duration-150">
          <TbDownload />
        </button>
        <p className="text-white ml-4">Download Template</p>
      </div>
      {/* Upload File */}
      <div>
        <p className="text-white mt-4">File</p>
        <div className="relative w-full mb-4">
          <label htmlFor="upfile">
            <div className="w-full  bg-white p-1.5 lg:p-1 rounded-md flex justify-between items-center  ">
              <p className="text-primaryPink ml-3">Upload File</p>
              <button
                // onClick={updateFiles}
                type="submit"
                className=" hover:border hover:border-primaryPink rounded-md    font-medium  text-lg px-4 py-2 "
              >
                <BsImages className="text-primaryPink" />
              </button>
            </div>
          </label>
          <input
            id="upfile"
            type="file"
            className="w-2/3 hidden"
            onChange={(e) => handleFile(e)}
          />
        </div>
      </div>
      {/* Create fron Form */}
      <p className="text-white mt-4">Form</p>
      <div className=" bg-white rounded-md w-full p-4">
        <div>
          <label htmlFor="idccms" className="block">
            ID
          </label>
          <input
            className="bg-primaryDark p-1.5 rounded-md w-full text-white"
            type="number"
            id="idccms"
            name="id"
            placeholder="Id User"
            // disabled={file ? true : false}
            onChange={(e) => handleUser(e)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            className="bg-primaryDark p-1.5 rounded-md w-full text-white"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            //disabled={file ? true : false}
            onChange={(e) => handleUser(e)}
          />
        </div>
        <div>
          <label htmlFor="lastname" className="block">
            Last Name
          </label>
          <input
            className="bg-primaryDark p-1.5 rounded-md w-full text-white"
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            // disabled={file ? true : false}
            onChange={(e) => handleUser(e)}
          />
        </div>
      </div>

      <div className="text-right mt-4 mb-16 lg:mb-0">
        <button
          onClick={onClose}
          className="py-2 px-6 mr-8 text-primaryPink font-bold bg-white rounded-md hover:scale-95 transition-all ease-in-out duration-150 hover:shadow hover:shadow-primaryPink"
        >
          Close
        </button>
        <button className="py-2 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink">
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateAgent;
