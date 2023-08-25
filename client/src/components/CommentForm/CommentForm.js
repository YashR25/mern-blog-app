import React, { useState } from "react";
import Comment from "../Comment/Comment";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch } from "react-redux";
import { postComment } from "../../redux/slices/blogSlice";
import { showToast } from "../../redux/slices/mainSlice";
import { TOAST_SUCCESS } from "../../App";
import Border from "../Border/Border";

function CommentForm({ comments, blogId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      postComment({
        name,
        email,
        comment,
        blogId,
      })
    );
    dispatch(
      showToast({ type: TOAST_SUCCESS, message: "Comment Posted Successfully" })
    );
    setName("");
    setEmail("");
    setComment("");
  };

  return (
    <div className="my-5">
      <div>
        <h1 className="text-2xl font-extrabold">Leave a comment</h1>
        <Border width={"60px"} />
        <form action="" className="flex flex-col gap-2 mt-5">
          <label htmlFor="comment" className="font-bold">
            Your Comment
          </label>
          <textarea
            className="focus:outline-none bg-gray-700 rounded-lg p-2"
            name="comment"
            id="comment"
            cols="30"
            rows="10"
            placeholder="Comment..."
            onChange={(event) => setComment(event.target.value)}
            value={comment}
          ></textarea>
          <label className="font-bold" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="focus:outline-none bg-gray-700 rounded-lg p-2"
            placeholder="Name..."
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="focus:outline-none bg-gray-700 rounded-lg p-2"
            placeholder="Email..."
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </form>
        <div className="flex w-[100%] justify-center items-center my-5">
          <button
            class="cursor-pointer bg-blue-700 font-semibold p-2 rounded-xl hover:bg-blue-900"
            onClick={handleSubmit}
          >
            Post Comment
          </button>
        </div>
        <h1 className="text-2xl font-extrabold">{comments?.length} Comments</h1>
        <Border width={"60px"} />
        <div className="my-5 flex flex-col gap-2">
          {comments?.map((comment) => {
            return <Comment comment={comment} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
