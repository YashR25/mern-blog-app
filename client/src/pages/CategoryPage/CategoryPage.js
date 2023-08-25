import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  decrementPage,
  getCategoryBlogs,
  incrementPage,
} from "../../redux/slices/categorySlice";
import BlogItem from "../../components/BlogItem/BlogItem";

function CategoryPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.categoryReducer.blogs);
  const page = useSelector((state) => state.categoryReducer.page);

  useEffect(() => {
    dispatch(getCategoryBlogs({ category: params?.category, page: page }));
  }, [page]);

  useEffect(() => {
    dispatch(getCategoryBlogs({ category: params?.category, page: 1 }));
  }, [params?.category]);

  return (
    <div className="w-screen min-h-screen mt-5">
      <div className="w-[80%] mx-auto">
        <h1 className="md:text-3xl text-2xl font-extrabold">
          Category: {params?.category?.toUpperCase()}
        </h1>
        <div class="border-2 w-[60px] border-blue-700 mt-1 rounded-sm"></div>
        <div className="w-[100%]">
          {categoryData?.blogs?.map((item) => {
            return <BlogItem blog={item} />;
          })}
        </div>
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
          {page} of {categoryData?.pageCount}
        </p>
        <button
          class="cursor-pointer bg-blue-700 font-semibold p-2 rounded-xl hover:bg-blue-900"
          onClick={() => {
            if (page < categoryData?.pageCount) {
              dispatch(incrementPage());
            }
          }}
          disabled={page >= categoryData?.pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CategoryPage;
