import Hero from "./components/HeroSection/Hero";
import Trending from "./components/Trending/Trending";
import Navbar from "./components/navbar/Navbar";
import Latest from "./components/Latest/Latest";
import Category from "./components/Category/Category";
import Subscribe from "./components/Subscribe/Subscribe";
import Footer from "./components/Footer/Footer";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import About from "./pages/About/About";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import User from "./components/User/User";
import Admin from "./pages/AdminPage/Admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";

function App() {
  const ref = useRef(null);
  const toastData = useSelector((state) => state.mainReducer.toastData);
  const isLoading = useSelector((state) => state.mainReducer.isLoading);

  if (isLoading) {
    ref.current?.continuousStart();
  } else {
    ref.current?.complete();
  }
  useEffect(() => {
    switch (toastData?.type) {
      case TOAST_SUCCESS:
        toast.success(toastData?.message);
        break;
      case TOAST_FAILURE:
        toast.error(toastData?.message);
        break;
    }
  }, [toastData]);
  return (
    <div>
      <ToastContainer />
      <LoadingBar ref={ref} color="rgb(29,78,216)" />
      <Routes>
        <Route path="/*" element={<User />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </div>
    // <div class="bg-[#04060D] w-screen text-white flex flex-col gap-2">
    //   <Navbar />
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/blog/:blogId" element={<BlogDetail />} />
    //     <Route path="/search/:searchText" element={<Search />} />
    //     <Route path="/about" element={<About />} />
    //     <Route path="/category/:category" element={<CategoryPage />} />
    //   </Routes>
    //   <Subscribe />
    //   <Footer />
    // </div>
  );
}

export default App;
