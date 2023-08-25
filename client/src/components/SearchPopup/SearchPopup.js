import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function SearchPopup({ onClose }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleKeyEvent = (event) => {
    console.log(event.key);
    if (event.key == "Enter") {
      navigate(`/search/${searchText}`);
      onClose();
    } else if (event.key == "Escape") {
      onClose();
    }
  };
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-gray-700 flex justify-center items-center z-[100]">
      <div className="md:w-[50%] w-[70%]">
        <div class="flex border-[1px] border-gray-800 h-10 w-[100%] p-3 justify-start items-center gap-3 md:bg-gray-900 rounded-xl text-gray-500 hover:bg-gray-800">
          <FaSearch class="text-blue-700 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="w-[100%] bg-transparent focus:outline-none"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            onKeyDown={handleKeyEvent}
            autoFocus
          />
        </div>
        <h1 className="text-center text-xl md:text-2xl mt-5 text-white">
          Hit <b>"Enter"</b> to search and <b>"Esc"</b> to exit
        </h1>
      </div>
      <div
        className="absolute right-10 top-10 text-white text-3xl cursor-pointer"
        onClick={onClose}
      >
        <AiFillCloseCircle />
      </div>
    </div>
  );
}

export default SearchPopup;
