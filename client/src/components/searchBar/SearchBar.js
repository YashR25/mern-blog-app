import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchPopup from "../SearchPopup/SearchPopup";

function SearchBar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {showSearch && <SearchPopup onClose={() => setShowSearch(false)} />}
      <div
        onClick={() => setShowSearch(true)}
        class="flex border-[1px] border-gray-800 h-10 md:w-48 p-3 justify-start items-center gap-3 md:bg-gray-900 rounded-xl text-gray-500 cursor-pointer hover:bg-gray-800"
      >
        <FaSearch class="text-blue-700 text-xl" />
        <p class="hidden md:block">Search...</p>
      </div>
    </>
  );
}

export default SearchBar;
