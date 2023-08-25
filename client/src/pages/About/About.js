import React from "react";
import Border from "../../components/Border/Border";

function About() {
  return (
    <div className="w-screen h-screen mt-5">
      <div className="w-[80%] mx-auto">
        <h1 className="md:text-3xl text-2xl font-extrabold">About Us</h1>
        <Border width={"60px"} />
        <p className="text-xl mt-5">
          Welcome to our cutting-edge blogging platform dedicated to all things
          developemnt! Whether you're a seasoned developer or just starting your
          coding journey. Our platform is your ultimate destination for
          insightful articles, tutorials, and discussions. Join a vibrant
          community of tech enthusiasts. Explore the latest trends in the coding
          world. From programming languages to best practices, our blog covers
          it all. Let's dive into the world of coding together!
        </p>
      </div>
    </div>
  );
}

export default About;
