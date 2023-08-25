import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementPage,
  getSearchData,
  incrementPage,
} from "../../redux/slices/searchSlice";
import BlogItem from "../../components/BlogItem/BlogItem";
import Border from "../../components/Border/Border";

function Search() {
  const params = useParams();
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.searchReducer.searchData);
  const page = useSelector((state) => state.searchReducer.page);

  useEffect(() => {
    dispatch(getSearchData({ searchText: params?.searchText, page: 1 }));
  }, [params?.searchText]);

  useEffect(() => {
    dispatch(getSearchData({ searchText: params?.searchText, page: page }));
  }, [page]);

  return (
    <div className="top-0 left-0 w-screen min-h-screen flex-col">
      <div className="w-[80vw] mx-auto flex flex-col">
        <h1 className="md:text-3xl text-2xl text-white font-extrabold mt-5">
          Search Result For: {params?.searchText}
        </h1>
        <Border width={"60px"} />
        <div class="md:w-[80vw] w-[100vw] mx-auto h-auto flex flex-col md:flex-row mt-10">
          <div class="w-[100%] md:w-[100%]">
            {searchData?.blogs?.map((blog) => {
              return <BlogItem blog={blog} />;
            })}
          </div>
        </div>
        {console.log(searchData)}
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
            {page} of {searchData?.pageCount}
          </p>
          <button
            class="cursor-pointer bg-blue-700 font-semibold p-2 rounded-xl hover:bg-blue-900"
            onClick={() => {
              if (page < searchData?.pageCount) {
                dispatch(incrementPage());
              }
            }}
            disabled={page >= searchData?.pageCount}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
