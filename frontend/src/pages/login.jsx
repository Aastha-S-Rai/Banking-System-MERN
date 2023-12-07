import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { Cookies } from "react-cookie";
// import { Button } from "react-bootstrap"
import { Button } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const defaultUserLogin = {
    email: "",
    password: "",
  };

  const [userLogin, setUserLogin] = useState(defaultUserLogin);

  const handleOnChange = (key, value) => {
    const obj = Object.assign({}, userLogin);
    obj[key] = value;
    setUserLogin(obj);
  };

  //   const saveUserLoginData = (userObj) => {
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(userObj),
  //     };
  //     fetch("http://localhost:4000/login", requestOptions)
  //       .then((response) => response.json())
  //       .then((responseData) => {
  //         console.log("responseData => ", responseData);
  //         if (responseData?.success) {
  //           navigate("/home");
  //         } else {
  //           alert(responseData?.message);
  //         }
  //       });
  //   };

  const saveUserLoginData = async (userObj) => {
    try {
      const response = await axios.post("https://bankinsystem1.onrender.com/login", userObj);
      console.log("POST Response:", response);
      if (response.data.res) {
        cookies.set("user", response.data.user);
        cookies.set("token", response.data.token);
        if(response.data.user.user_type == "Customer"){
          navigate("/dashboard");
        }
        else{
          navigate("/BankerBoard");
        }
        console.log("After navigating to /home");
      }
      // Handle the response as needed
    } catch (error) {
      alert("Login Failed");
      // Handle the error as needed
    }
  };

  return (
    <div className="flex-container">
      <div className="container">
        <h1 className="login-heading mouse-pointer">Login</h1>

        <div className="form-container">
          <label className="heading-label">Email</label>
          <input
            type="email"
            name="username"
            id="username"
            className="input-box"
            onChange={(e) => {
              handleOnChange("email", e.target.value);
            }}
            value={userLogin.email}
          />

          <label className="heading-label">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            className="input-box"
            onChange={(e) => {
              handleOnChange("password", e.target.value);
            }}
            value={userLogin.password}
          />

          <Button
            variant="contained"
            className="login-button"
            color="primary"
            onClick={() => saveUserLoginData(userLogin)}
          >
            Login
          </Button>
          <div className="mt-1">
          Don't already have an account? <Link to="/">Signup</Link>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
