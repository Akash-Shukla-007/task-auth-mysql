import React, { useState } from "react";
import "../src/assests/css/App.css";
import Auth from "./Pages/AuthPages/Auth";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./Pages/AuthPages/ForgotPassword";
import Default from "./Pages/AppPages/Default";
import ProtectedRoutes from "./Services/Navigation/ProtectedRoutes";
import UnProtectedRoutes from "./Services/Navigation/UnProtectedRoutes";

function App() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/default" element={<Default />} />
      </Route>
      <Route element={<UnProtectedRoutes />}>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Auth isSignUp />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
