import React, { useEffect } from "react";
import Hero from "../../components/HeroSection/Hero";
import Trending from "../../components/Trending/Trending";
import Latest from "../../components/Latest/Latest";
import Category from "../../components/Category/Category";
import Subscribe from "../../components/Subscribe/Subscribe";
import { getMainData } from "../../redux/slices/mainSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMainData());
  }, []);
  const mainData = useSelector((state) => state.mainReducer.mainData);
  return (
    <div>
      <Hero />
      <Trending data={mainData?.trendingPosts} />
      <div class="md:w-[80vw] w-[100vw] mx-auto h-auto flex flex-col md:flex-row mt-10">
        <div class="w-[100%] md:w-[70%]">
          <Latest
            data={mainData?.latestBlogs}
            pageCount={mainData?.pageCount}
          />
        </div>
        <div class="w-[100%] md:w-[30%]">
          <Category />
        </div>
      </div>
    </div>
  );
}

export default Home;
