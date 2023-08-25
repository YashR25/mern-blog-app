import React from "react";
import demo from "../../raw/demo.jpg";
import { FaRegComment } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function BlogItem({ blog }) {
  const navigate = useNavigate();
  return (
    <div
      class="group md:h-[150px] h-100px w-[100%] flex gap-1 my-5 cursor-pointer border-b-[1px] border-gray-800 py-2"
      onClick={() => navigate(`/blog/${blog._id}`)}
    >
      <div class="w-[35%] h-[100%] rounded-xl overflow-hidden">
        <img
          class="w-[100%] h-[100%] object-cover aspect-[16/9]"
          src={blog?.thumbnail?.url}
          alt="demo img"
        />
      </div>
      <div class="h-[100%] w-[70%] flex flex-col justify-between px-3 gap-2">
        <h1 class="md:text-xl text-base font-bold h-[50%] overflow-ellipsis group-active:text-blue-700">
          {blog?.title}
        </h1>
        <div class="flex mb-3 gap-2">
          <div class="flex gap-2 items-center text-xs">
            <FaRegComment />
            <p>{blog?.comments?.length}</p>
          </div>
          <div class="flex gap-2 items-center text-xs">
            <BiCategoryAlt />
            <p>{blog?.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
