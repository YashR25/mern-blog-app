import React, { useRef } from "react";
import SearchBar from "../searchBar/SearchBar";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const navRef = useRef(null);
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      navRef.current.style.top = "0";
    } else {
      navRef.current.style.top = "-150px";
    }
    prevScrollpos = currentScrollPos;
  };
  return (
    <div
      class="w-screen h-16 fixed z-[300] top-0 duration-300 ease-in backdrop-blur-md shadow-[0px_0px_2px_black]"
      ref={navRef}
    >
      <div class="flex justify-between items-center p-3 h-[100%] md:w-[80%] md:mx-auto text-base md:text-lg text-blue-700">
        <h1
          class="text-2xl md:text-3xl font-extrabold cursor-pointer"
          onClick={() => navigate("/")}
        >
          CODE <span className="text-white">VIDYA</span>
        </h1>
        <div class="flex items-center gap-3 h-[100%]">
          <SearchBar />
          <div class="h-[100%] border-[1px] border-gray-800"></div>
          <button
            class="cursor-pointer bg-blue-700 font-semibold p-2 text-white rounded-xl hover:bg-blue-900"
            onClick={() => navigate("/about")}
          >
            About Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
