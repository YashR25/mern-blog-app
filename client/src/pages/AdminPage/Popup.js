import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function Popup({ onClose, onDelete }) {
  return (
    <div className="bg-gray-700 absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div
        className="absolute right-5 top-5 text-3xl cursor-pointer"
        onClick={onClose}
      >
        <AiFillCloseCircle />
      </div>
      <div className="bg-gray-900 rounded-xl w-[500px] h-[150px] p-3 flex flex-col justify-between">
        <h1 className="font-bold text-2xl">
          Are you sure you want to delete the post?
        </h1>
        <div className="w-[100%] flex justify-center items-center gap-3">
          <button
            className="p-2 rounded-xl bg-[#04060D] text-white hover:bg-black"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
