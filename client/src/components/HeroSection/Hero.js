import React from "react";
import devStockImg from "../../raw/devStockImg.png";
import heroImg from "../../raw/heroImage.png";
import Typewriter from "../Typewriter/Typewriter";

function Hero() {
  const stringArr = [];
  const string = "Development";
  for (let i = 0; i < string.length; i++) {
    stringArr.push(string[i]);
  }
  return (
    <div class="w-screen h-screen px-3 flex flex-col md:flex-row md:w-[80%] md:mx-auto items-center relative">
      <div class="w-[100%] md:w-[70%] h-[100%] flex items-center text-center md:text-start">
        <div>
          <p class="text-blue-700 font-bold overflow-hidden whitespace-nowrap inline-block mx-auto ">
            Discover Interesting Development Topic You Will Love
          </p>
          {/* <Typewriter text={stringArr} /> */}
          <h1 class="font-extrabold md:text-6xl text-4xl">
            Read About Latest in
          </h1>
          <Typewriter text={stringArr} />
        </div>
      </div>
      <div class="w-[80%] md:w-[40%] h-[100%] md:h-auto md:absolute md:right-0">
        <img
          class="w-[100%] h-[100%] object-cover"
          src={devStockImg}
          alt="Hero Image"
        />
      </div>
    </div>
  );
}

export default Hero;
