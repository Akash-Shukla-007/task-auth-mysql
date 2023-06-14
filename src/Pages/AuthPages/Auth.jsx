import { useState } from "react";
import React from "react";
import DynamicInput from "../../components/DynamicInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiLoaderCircle } from "react-icons/bi";
import {
  gettingStarted,
  login,
} from "../../Services/AxiosServices/httpRequests";

function Auth({ isSignUp, setIsSignUp }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Error states
  const [nameErrorText, setNameErrorText] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");

  // Name Validation Function checker
  const nameValidator = (name) => {
    if (name == "") {
      setNameErrorText("Name is required");
      return false;
    }
    setNameErrorText("");
    return true;
  };

  // Email Validation Function checker
  const emailValidator = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email == "") {
      setEmailErrorText("Email is required");
      return false;
    }
    if (!re.test(email) && isSignUp) {
      setEmailErrorText("Enter valid email");
      return false;
    }
    setEmailErrorText("");
    return true;
  };

  // Password Validation Function checker
  const passwordValidator = (password) => {
    if (password === "") {
      setPasswordErrorText("Password is required");
      return false;
    }
    if (password.length < 8 && isSignUp) {
      setPasswordErrorText("Password should not be less than 8 characters");
      return false;
    }
    if (password.search(/\d+/g) < 0 && isSignUp) {
      setPasswordErrorText("Password must contain atleast one Number");
      return false;
    }
    if (password.search(/[A-Z]/) < 0 && isSignUp) {
      setPasswordErrorText(
        "Password must contain atleast one Uppercase character"
      );
      return false;
    }
    setPasswordErrorText("");
    return true;
  };

  // Submit function
  const handleSubmit = async () => {
    let v0 = nameValidator(name);
    let v1 = emailValidator(email);
    let v2 = passwordValidator(password);

    if (!(v1 && v2 && (v0 || !isSignUp))) return;
    // console.log(email + " " + name + " " + password);
    if (isSignUp) {
      setLoading(true);
      gettingStarted({ name, email, password })
        .then((res) => {
          setLoading(false);
          localStorage.setItem("Logintoken", res.data.token);
          navigate("/default");
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.data.message) {
            setEmailErrorText(err.response.data.message);
          }
        });
    } else {
      setLoading(true);
      login({ email, password })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          localStorage.setItem("Logintoken", res.data.token);
          navigate("/default");
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.data.message) {
            setPasswordErrorText(err.response.data.message);
          }
        });
    }
  };

  return (
    <div className="root_auth_container">
      <div className="root_auth_left_conatiner">
        <h1 className="root_auth_heading">
          {isSignUp ? "Getting Started" : "Login"}
        </h1>
        {isSignUp && (
          <DynamicInput
            placeholder="Enter Name"
            type="text"
            value={name}
            setValue={setName}
            errorText={nameErrorText}
          />
        )}
        <DynamicInput
          placeholder="Enter Email"
          type="text"
          value={email}
          setValue={setEmail}
          errorText={emailErrorText}
        />
        <DynamicInput
          placeholder="Enter Password"
          type="password"
          value={password}
          setValue={setPassword}
          errorText={passwordErrorText}
        />
        {!isSignUp && (
          <Link className="root_auth_forgot_link" to="/forgot">
            Forgot Password?
          </Link>
        )}
        <button className="root_auth_button" onClick={handleSubmit}>
          {isSignUp ? "Sign up" : "Login"}
        </button>
        <Link
          to={isSignUp ? "/signin" : "/signup"}
          style={{
            cursor: "pointer",
            alignSelf: "center",
            marginTop: "10px",
            color: "black",
            textDecoration: "none",
          }}
        >
          {isSignUp ? "Have an Account ?" : "Create an Account"}
          <span className="root_span_contianer">
            {"  "}
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </Link>
      </div>
      {loading && (
        <div className="loader">
          <BiLoaderCircle size={100} />
        </div>
      )}
    </div>
  );
}

export default Auth;
