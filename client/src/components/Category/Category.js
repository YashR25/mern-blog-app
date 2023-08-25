import React from "react";
import demo from "../../raw/demo.jpg";
import { useNavigate } from "react-router-dom";
import Border from "../Border/Border";

function Category() {
  const categoryArr = [
    {
      category: "android",
      image: "https://4kwallpapers.com/images/walls/thumbs_3t/8513.png",
    },
    {
      category: "mern",
      image:
        "https://media.istockphoto.com/id/1358013032/photo/web-development-concept.webp?b=1&s=170667a&w=0&k=20&c=aAR7goX4e7jDiUfx1SNA7lD04WldUv6okpifv80xGcw=",
    },
  ];
  const navigate = useNavigate();
  return (
    <div class="w-[100%] px-3 mb-5">
      <h1 class=" text-2xl md:text-3xl font-bold">Category</h1>
      <Border width={"60px"} />
      <div class="mt-10 flex flex-wrap md:flex-col gap-2 items-center md:items-start cursor-pointer overflow-hidden justify-between">
        {categoryArr.map((item) => {
          return (
            <div
              class="md:w-[60%] w-[45%] h-[250px] relative overflow-hidden group"
              onClick={() => navigate(`/category/${item.category}`)}
            >
              <div class="w-[100%] h-[100%] rounded-xl overflow-hidden">
                <img
                  src={item.image}
                  alt="demo"
                  class="w-[100%] h-[100%] object-cover group-hover:scale-110 duration-300"
                />
              </div>

              <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-gradient-to-t from-black to-transparent"></div>
              <div class="absolute bottom-6 left-[50%] translate-x-[-50%] bg-blue-700 p-1 rounded-lg">
                <p class=" font-bold text-white">{item.category}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
