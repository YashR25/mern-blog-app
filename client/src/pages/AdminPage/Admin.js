import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireUser from "../../components/RequireUser/RequireUser";
import IfNotLoggedIn from "../../components/IfNotLoggedIn/IfNotLoggedIn";
import AdminLogin from "../../components/AdminLogin/AdminLogin";
import AdminHome from "./AdminHome";
import AdminAddNote from "./AdminAddBlog";

function Admin() {
  return (
    <div>
      <Routes>
        <Route element={<RequireUser />}>
          <Route path="/" element={<AdminHome />} />
          <Route path="/addNote" element={<AdminAddNote editMode={false} />} />
          <Route
            path="/editBlog/:blogId"
            element={<AdminAddNote editMode={true} />}
          />
        </Route>
        <Route element={<IfNotLoggedIn />}>
          <Route path="/adminLogin" element={<AdminLogin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Admin;
