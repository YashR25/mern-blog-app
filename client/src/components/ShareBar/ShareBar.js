import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiFillTwitterCircle, AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeBlog, unLikeBlog } from "../../redux/slices/blogSlice";

function ShareBar({ blog }) {
  const [isLike, setIsLike] = useState(false);
  const dispatch = useDispatch();
  const handleLike = () => {
    if (blog?._id) {
      if (isLike == false) {
        dispatch(likeBlog({ blogId: blog?._id }));
        setIsLike(true);
      } else {
        dispatch(unLikeBlog({ blogId: blog?._id }));
        setIsLike(false);
      }
    }
  };
  return (
    <div className="w-[100%] flex justify-between my-5 items-center">
      <div
        className="flex gap-2 items-center cursor-pointer hover:border-white border-transparent rounded-2xl border-[1px] p-2"
        onClick={() => {
          handleLike();
        }}
      >
        {isLike ? (
          <AiFillHeart className="text-xl" />
        ) : (
          <AiOutlineHeart className="text-xl" />
        )}
        <p>{blog?.likes} Likes</p>
      </div>
      <div className="flex gap-2 text-xl">
        <BsFacebook />
        <MdEmail />
        <AiFillTwitterCircle />
      </div>
    </div>
  );
}

export default ShareBar;
