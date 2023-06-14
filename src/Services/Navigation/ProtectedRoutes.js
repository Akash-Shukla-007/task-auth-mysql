import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  var token = localStorage.getItem("Logintoken");
  if (!token) {
    return <Navigate to="/signup" replace={true} />;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
