import React from "react";
import Navbar from "../navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import BlogDetail from "../../pages/BlogDetail/BlogDetail";
import Search from "../../pages/Search/Search";
import About from "../../pages/About/About";
import CategoryPage from "../../pages/CategoryPage/CategoryPage";
import Subscribe from "../Subscribe/Subscribe";
import Footer from "../Footer/Footer";

function User() {
  return (
    <div class="bg-[#04060D] w-screen text-white flex flex-col gap-2">
      <Navbar />
      <div className=" mt-14"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId" element={<BlogDetail />} />
        <Route path="/search/:searchText" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
      <Subscribe />
      <Footer />
    </div>
  );
}

export default User;
