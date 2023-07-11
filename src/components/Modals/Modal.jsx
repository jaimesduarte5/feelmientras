import React from "react";

const Modal = ({ visible, onClose, children }) => {
  if (!visible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-secondaryDark bg-opacity-75 flex justify-center items-center z-50"
      id="wrapper"
      onClick={(e) => handleClose(e)}
    >
      <div className=" flex flex-col ">
        <div className="p-2 rounded-md">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
