import React, { useState } from "react";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageClient";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/slices/mainSlice";
import { TOAST_SUCCESS } from "../../App";

function AdminLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/auth/login", {
        email: userName,
        password: password,
      });
      setItem(KEY_ACCESS_TOKEN, res.result);
      dispatch(
        showToast({ type: TOAST_SUCCESS, message: "Successfully Logged in" })
      );
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#04060D] flex w-screen h-screen justify-center items-center text-white">
      <div className="w-[50%] h-[50%] bg-gray-900 rounded-xl p-2 flex flex-col justify-between items-center">
        <div className="w-[100%] flex justify-center items-center">
          <div className="">
            <h1 className="md:text-3xl text-2xl font-extrabold">Login</h1>
            <div className="border-2 border-blue-700 w-[100%] mt-2 rounded-sm"></div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-5 w-[100%]">
          <input
            type="text"
            className="p-2 w-[100%] bg-gray-700 rounded-xl focus:outline-none"
            placeholder="UserName..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            className="p-2 w-[100%] bg-gray-700 rounded-xl focus:outline-none"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          class="cursor-pointer bg-blue-700 font-semibold p-2 rounded-xl hover:bg-blue-900"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
