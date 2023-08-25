import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getAdminData } from "../../redux/slices/adminSlice";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageClient";
import { axiosClient } from "../../utils/axiosClient";
import { incrementPage, decrementPage } from "../../redux/slices/adminSlice";
import Popup from "./Popup";
import { showToast } from "../../redux/slices/mainSlice";
import { TOAST_SUCCESS } from "../../App";
import Charts from "./Charts";

function AdminHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selecetedId, setSelectedId] = useState("");
  const adminData = useSelector((state) => state.adminReducer.adminData);
  console.log(adminData);
  const page = useSelector((state) => state.adminReducer.page);
  useEffect(() => {
    dispatch(getAdminData({ page: 1, limit: 4 }));
  }, []);
  useEffect(() => {
    dispatch(getAdminData({ page, limit: 4 }));
  }, [page]);
  const handleLogout = async () => {
    await axiosClient.get("/auth/logout");
    dispatch(
      showToast({ type: TOAST_SUCCESS, message: "Successfully Logged Out" })
    );
    removeItem(KEY_ACCESS_TOKEN);
    navigate("/admin/adminLogin");
  };
  const handleDelete = (id) => {
    setShowDeletePopup(false);
    dispatch(deleteBlog({ id }));
    dispatch(
      showToast({ type: TOAST_SUCCESS, message: "Post Deleted Successfully" })
    );
  };
  return (
    <div className="bg-[#04060D] flex w-screen text-white">
      {showDeletePopup && (
        <Popup
          onClose={() => setShowDeletePopup(false)}
          onDelete={() => handleDelete(selecetedId)}
        />
      )}
      <div className="w-[30%] h-screen border-r-[1px] border-gray-800 p-5">
        <h1 className=" font-extrabold md:text-2xl text-lg">
          <span className="text-blue-700">CODE</span> VIDYA Admin
        </h1>
        <div className="flex flex-col gap-2 mt-5 w-[100%] overflow-hidden">
          <div className="flex gap-2 p-2 text-xl font-bold items-center w-[100%] hover:bg-blue-700 cursor-pointer rounded-xl">
            <AiOutlineHome />
            <p>Dashboard</p>
          </div>
          <button
            class="cursor-pointer bg-blue-700 font-semibold p-2 rounded-xl hover:bg-blue-900"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="items-center h-screen overflow-scroll p-5 w-[70%] flex flex-col">
        <h1 className="md:text-3xl text-2xl font-extrabold">Dashboard</h1>
        <div className="bg-gray-800 w-[100%] rounded-xl mt-5 p-2">
          <div className="flex w-[100%] justify-between items-center">
            <div>
              <h1 className="font-bold text-xl">Posts</h1>
              <div className="border-2 border-blue-700 rounded-sm w-[30px]"></div>
            </div>
            <button
              class="cursor-pointer bg-blue-700 font-semibold p-2 rounded-xl hover:bg-blue-900"
              onClick={() => navigate("/admin/addNote")}
            >
              Add Post
            </button>
          </div>
          <div className="border-[1px] w-[100%] border-gray-700 mt-3"></div>
          <div className="mt-5 flex flex-col gap-3">
            {adminData?.blogs?.map((blog) => {
              return (
                <div className="w-[100%] flex justify-between items-center shadow-[0px_5px_10px_1px_rgb(0,0,0,0.7)] p-2 rounded-xl">
                  <div className="w-[50%]">
                    <h1 className="w-[100%] overflow-ellipsis overflow-hidden whitespace-nowrap font-bold ">
                      {blog?.title}
                    </h1>
                  </div>
                  <div className="flex gap-5 text-xl ">
                    <div
                      className="text-green-600 hover:bg-green-600 hover:text-white cursor-pointer p-2 rounded-xl"
                      onClick={() => navigate(`/admin/editBlog/${blog?._id}`)}
                    >
                      <FaRegEdit />
                    </div>
                    <div
                      className=" text-red-600 hover:bg-red-600 hover:text-white cursor-pointer p-2 rounded-xl"
                      onClick={(e) => {
                        setShowDeletePopup(true);
                        setSelectedId(blog?._id);
                      }}
                    >
                      <MdDelete />
                    </div>
                  </div>
                </div>
              );
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
              {page} of {adminData?.pageCount}
            </p>
            <button
              class="cursor-pointer bg-blue-700 font-semibold p-2 rounded-xl hover:bg-blue-900"
              onClick={() => {
                if (page < adminData?.pageCount) {
                  dispatch(incrementPage());
                }
              }}
              disabled={page >= adminData?.pageCount}
            >
              Next
            </button>
          </div>
        </div>
        <div className="w-[100%] h-[300px] mt-5">
          <Charts data={adminData?.chartData} />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
