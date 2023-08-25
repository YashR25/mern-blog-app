import React, { useEffect, useRef } from "react";
import demo from "../../raw/demo.jpg";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import BlogItem from "../../components/BlogItem/BlogItem";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye } from "react-icons/ai";
import {
  getBlogData,
  getCategoryPopularBlogs,
} from "../../redux/slices/blogSlice";
import CommentForm from "../../components/CommentForm/CommentForm";
import ShareBar from "../../components/ShareBar/ShareBar";
import PopularBlogItem from "../../components/PopularBlogItem/PopularBlogItem";
import Border from "../../components/Border/Border";

function BlogDetail() {
  const blogRef = useRef(null);
  const params = useParams();
  const dispatch = useDispatch();
  const blogData = useSelector((state) => state.blogReducer.blogData);
  const popularData = useSelector((state) => state.blogReducer.popular);
  // console.log(blogId);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(getBlogData(params.blogId));
  }, [params.blogId]);
  useEffect(() => {
    blogRef.current.innerHTML = blogData?.content;
    dispatch(getCategoryPopularBlogs(blogData?.category));
  }, [blogData]);

  return (
    <div class="w-screen bg-[#04060D] text-white relative">
      <div class="md:w-[80%] mx-auto w-[100%] px-3">
        <div class="bg-white p-1 inline-block rounded-xl text-sm mt-5">
          <p class="inline-block text-black">
            {blogData?.category?.toUpperCase()}
          </p>
        </div>
        <h1 class="md:text-5xl text-3xl font-extrabold mt-5">
          {blogData?.title}
        </h1>
        <div class="flex gap-5 mt-5 text-xs flex-wrap">
          <div class="flex gap-1">
            <div class="flex gap-2 items-center text-xs">
              <AiOutlineUser />
              <p>By Author</p>
            </div>
            <p>--</p>
            <p>Posted: {blogData?.createdAt?.split("T")[0]}</p>
            <p>--</p>
            <p>Updated: {blogData?.updatedAt?.split("T")[0]}</p>
          </div>
          <div class="flex gap-2 items-center text-xs">
            <FaRegComment />
            <p>{blogData?.comments?.length} Comments</p>
          </div>
          <div class="flex gap-2 items-center text-xs">
            <AiOutlineEye />
            <p>{blogData?.views} Views</p>
          </div>
        </div>
        <div class="flex mt-6 flex-col md:flex-row gap-3">
          <div class="md:w-[70%] w-[100%] px-2">
            <div class="w-[100%] rounded-xl overflow-hidden">
              <img
                src={blogData?.thumbnail?.url}
                class="w-[100%] h-[100%] object-cover aspect-[16/9]"
                alt="demo"
              />
            </div>
            <div class="mt-5">
              <div ref={blogRef}></div>
            </div>
            <ShareBar blog={blogData} />
            <div className="border-[1px] border-gray-800 my-5"></div>
            <CommentForm comments={blogData?.comments} blogId={blogData?._id} />
          </div>
          <div class="md:w-[30%] w-[100%] px-2">
            {/* <div>
              <h1 class=" text-2xl md:text-3xl font-bold">Editors's Pick</h1>
              <div class="border-2 w-[60px] border-blue-700 mt-1 rounded-sm"></div>
            </div> */}
            <div className="mt-5">
              <h1 class=" text-2xl md:text-3xl font-bold">Popular</h1>
              <Border width={"60px"} />
              <div className="flex flex-col items-center gap-2 my-5">
                {popularData?.map((blog) => {
                  return <PopularBlogItem blog={blog} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
