import React from "react";
import { AiOutlineUser } from "react-icons/ai";

function Comment({ comment }) {
  return (
    <div className="w-[100%] flex gap-5 items-center">
      <div className="text-xl">
        <AiOutlineUser />
      </div>
      <div>
        <p className="font-bold">{comment?.name}</p>
        <p>{comment?.comment}</p>
      </div>
    </div>
  );
}

export default Comment;
