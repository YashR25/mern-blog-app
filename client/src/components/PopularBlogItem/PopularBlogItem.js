import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";

function PopularBlogItem({ blog }) {
  return (
    <div className="w-[100%] rounded-xl shadow-lg bg-gray-900 overflow-hidden cursor-pointer group">
      <div className="w-[100%] h-[50%] overflow-hidden">
        <img
          src={blog?.thumbnail?.url}
          alt={blog?.title}
          className="w-[100%] h-[100%] object-cover group-hover:scale-110 duration-300 aspect-[16/9]"
        />
      </div>
      <div className="p-2">
        <h1 className="md:text-lg text-base font-bold h-[50%] overflow-ellipsis group-active:text-blue-700">
          {blog?.title}
        </h1>
        <p className="text-sm">desc...</p>
        <div className="flex gap-2">
          <div class="flex gap-2 items-center text-xs my-2">
            <FaRegComment />
            <p>{blog?.comments?.length}</p>
          </div>
          <div class="flex gap-2 items-center text-xs">
            <BiCategoryAlt />
            <p>{blog?.category}</p>
          </div>
          <div class="flex gap-2 items-center text-xs">
            <AiOutlineEye />
            <p>{blog?.views}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularBlogItem;
