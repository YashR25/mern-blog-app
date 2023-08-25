import React from "react";

function Footer() {
  return (
    <div class="w-[100vw] h-[30vh]">
      <div class="w-[80%] h-[100%] mx-auto flex md:justify-between items-center flex-col md:flex-row justify-around">
        <div class="flex gap-3 text-white">
          <p class="cursor-pointer hover:text-blue-700">Youtube</p>
          <p class="cursor-pointer hover:text-blue-700">Linkedin</p>
          <p class="cursor-pointer hover:text-blue-700">Email</p>
        </div>
        <div>
          <h1 class="font-extrabold text-2xl md:text-3xl text-blue-700">
            CODE <span className="text-white">VIDYA</span>
          </h1>
        </div>
        <div class="font-bold text-xs">©2023. All rights reserved.</div>
      </div>
    </div>
  );
}

export default Footer;
