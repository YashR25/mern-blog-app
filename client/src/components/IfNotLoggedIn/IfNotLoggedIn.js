import React from "react";
import { KEY_ACCESS_TOKEN, getItem } from "../../utils/localStorageClient";
import { Navigate, Outlet } from "react-router-dom";

function IfNotLoggedIn() {
  const user = getItem(KEY_ACCESS_TOKEN);

  return user ? <Navigate to="/admin" /> : <Outlet />;
}

export default IfNotLoggedIn;
