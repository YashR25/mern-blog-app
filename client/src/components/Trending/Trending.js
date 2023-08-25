import React from "react";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import Border from "../Border/Border";

function Trending({ data }) {
  const navigate = useNavigate();
  return (
    <div class="md:w-[80vw] w-[100vw] h-screen px-3 mx-auto flex flex-col mt-10">
      <h1 class=" text-2xl md:text-3xl font-bold">Trending</h1>
      <Border width={"60px"} />
      <div class="grid grid-cols-1 md:grid-cols-4 w-[100%] h-[100%] overflow-hidden gap-2 mt-5 md:grid-rows-2">
        {data?.map((blog) => {
          return (
            <div
              onClick={() => {
                navigate(`/blog/${blog._id}`);
              }}
              className="w-[100%] first-of-type:md:col-span-2 first-of-type:md:row-span-2 last-of-type:md:col-span-2"
            >
              <Card key={blog._id} blog={blog} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Trending;
