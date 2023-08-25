import React from "react";
import demo from "../../raw/demo.jpg";
import { FaRegComment } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";

function Card({ blog }) {
  return (
    <div class="w-[100%] h-[100%] overflow-hidden cursor-pointer">
      <div class=" group w-[100%] h-[100%] rounded-xl overflow-hidden relative">
        <div class="absolute top-0 left-0 w-[100%] h-[100%] bg-gradient-to-t from-black"></div>
        <img
          class="w-[100%] h-[100%] object-cover group-hover:scale-110 duration-300"
          src={blog?.thumbnail?.url}
          alt={`${blog?.title}`}
        />
        <div className="absolute left-0 bottom-0 p-4 overflow-hidden w-[100%]">
          <h1 class="font-bold overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[100%] md:whitespace-normal md:h-auto h-[30px]">
            {blog?.title}
          </h1>
          <div class="flex items-center gap-5 mt-2">
            <div class="flex gap-2 items-center text-xs">
              <FaRegComment />
              <p>0</p>
            </div>
            <div class="flex gap-2 items-center text-xs">
              <BiCategoryAlt />
              <p>Android</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
