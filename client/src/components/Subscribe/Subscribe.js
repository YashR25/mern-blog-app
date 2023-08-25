import React from "react";
import { AiFillMail } from "react-icons/ai";

function Subscribe() {
  return (
    <div class="w-[100vw] h-[30vh] bg-gray-950">
      <div class="flex mx-auto w-[80%] h-[100%] items-center md:justify-between justify-around flex-col md:flex-row">
        <h1 class="text-2xl font-bold">Subscribe For New Content</h1>
        <div class="flex gap-2">
          <div class="w-48 flex rounded-xl bg-black p-3 text-white items-center gap-3">
            <AiFillMail />
            <p>test@gmail.com</p>
          </div>
          <button class="cursor-pointer bg-blue-700 font-semibold p-2 rounded-xl hover:bg-blue-900">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
