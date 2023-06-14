import { useState } from "react";
import React from "react";
import DynamicInput from "../../components/DynamicInput";
import { Link } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <div className="root_auth_container">
      <div className="root_auth_left_conatiner">
        <h1 className="root_auth_heading">Forgot Password</h1>
        <DynamicInput
          placeholder="Enter Email"
          type="text"
          value={email}
          setValue={setEmail}
          errorText="Email is required"
        />
        <button className="root_auth_button">Proceed</button>
        <p style={{ alignSelf: "center" }}>
          Back to
          <Link
            style={{
              textDecoration: "none",
              color: "#3A5B22",
              marginTop: "10px",
              marginLeft: "5px",
              fontWeight: "600",
            }}
            to="/"
          >
            Sign Up
          </Link>
        </p>
      </div>
      {loading && (
        <div className="loader">
          <BiLoaderCircle size={100} />
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
