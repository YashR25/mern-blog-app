import React, { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, updateBlog } from "../../redux/slices/adminSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogData } from "../../redux/slices/blogSlice";
import { showToast } from "../../redux/slices/mainSlice";
import { TOAST_SUCCESS } from "../../App";

function AdminAddNote({ editMode }) {
  const params = useParams();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isImageChange, setIsImageChange] = useState(false);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const blogData = useSelector((state) => state.blogReducer.blogData);
  const navigate = useNavigate();

  useEffect(() => {
    if (editMode == true) {
      dispatch(getBlogData(params?.blogId));
    }
  }, [params.blogId]);

  useEffect(() => {
    editMode ? setTitle(blogData?.title) : setTitle("");
    editMode ? setContent(blogData?.content) : setContent("");
    editMode ? setCategory(blogData?.category) : setCategory("");
    editMode ? setImage(blogData?.thumbnail?.url) : setImage("");
  }, [blogData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode == true) {
      dispatch(
        updateBlog({
          title,
          image: isImageChange ? image : null,
          content,
          category,
          id: blogData?._id,
        })
      );
      dispatch(
        showToast({ type: TOAST_SUCCESS, message: "Blog Updated Successfully" })
      );
      navigate("/admin");
    } else {
      dispatch(addBlog({ title, image, content, category }));
      dispatch(
        showToast({ type: TOAST_SUCCESS, message: "Post Added Successfully" })
      );
      setTitle("");
      setImage("");
      setContent("");
      setCategory("");
      navigate("/admin");
    }
  };

  const handleImageChange = (e) => {
    setIsImageChange(true);
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setImage(fileReader.result);
      }
    };
  };

  return (
    <div className="bg-[#04060D] w-screen min-h-screen text-white">
      {console.log(blogData)}
      <div className="p-5 md:w-[50%] w-[100%]">
        <h1 className="md:text-3xl text-xl font-extrabold">Add Blog</h1>
        <div className="border-2 border-blue-700 w-[70px] rounded-sm"></div>
        <form action="" className="mt-5 flex flex-col gap-5">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            type="text"
            className="bg-gray-700 w-[100%] rounded-xl p-2 focus:outline-none"
            placeholder="Title..."
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="image" className="font-bold">
            Image
          </label>
          <img
            src={image}
            alt="image"
            className="w-[100px] h-[100px] object-cover"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-700 p-2 rounded-xl"
          >
            <option value="android">Android</option>
            <option value="mern">MERN</option>
          </select>
          <label htmlFor="content" className="font-bold">
            Content
          </label>
          <TextEditor content={content} setContent={setContent} />
          <button
            class="cursor-pointer bg-blue-700 font-semibold p-2 rounded-xl hover:bg-blue-900"
            onClick={handleSubmit}
          >
            {editMode ? "Update" : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddNote;
