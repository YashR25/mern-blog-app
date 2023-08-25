import React, { useEffect } from "react";
import BlogItem from "../BlogItem/BlogItem";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementPage,
  getLatestBlogs,
  incrementPage,
} from "../../redux/slices/mainSlice";
import Border from "../Border/Border";

function Latest({ data, pageCount }) {
  const page = useSelector((state) => state.mainReducer.page);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLatestBlogs(page));
  }, [page]);
  return (
    <div class="w-[100%] px-3 h-auto mx-auto flex flex-col">
      <h1 class=" text-2xl md:text-3xl font-bold">Latest</h1>
      <Border width={"60px"} />
      <div class="mt-5">
        {data?.map((blog) => {
          return <BlogItem blog={blog} />;
        })}
      </div>
      <div className="w-[100%] flex justify-center items-center gap-2 my-5">
        <button
          class="cursor-pointer bg-blue-700 font-semibold p-2 rounded-xl hover:bg-blue-900"
          onClick={() => {
            if (page > 1) {
              dispatch(decrementPage());
            }
          }}
          disabled={page <= 1}
        >
          Prev
        </button>
        <p>
          {page} of {pageCount}
        </p>
        <button
          class="cursor-pointer bg-blue-700 font-semibold p-2 rounded-xl hover:bg-blue-900"
          onClick={() => {
            if (page < pageCount) {
              dispatch(incrementPage());
            }
          }}
          disabled={page >= pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Latest;
