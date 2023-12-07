import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { Cookies } from "react-cookie";
// import { Button } from "react-bootstrap"
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

const Signin = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const defaultUserLogin = {
    fname: "",
    lname: "",
    mname: "",
    user_type: "Customer",
    email: "",
    password: "",
    balance_amount: 0,
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
    const response = await axios.post(
      "https://bankinsystem1.onrender.com/users/add",
      userObj
    );
    console.log("POST Response:", response);
    if (response.data.res) {
      cookies.set("user", response.data.user);
      cookies.set("token", response.data.token);
      if (response.data.res.user_type == "Customer") {
        navigate("/login");
      } else {
        navigate("/BankerBoard");
      }
      console.log("After navigating to /home");
      // Handle the response as needed
    } else {
      alert("Login Failed");
      // Handle the error as needed
    }
  };

  return (
    <div className="flex-container">
      <div className="container">
        <h1 className="login-heading mouse-pointer">SignUp</h1>

        <div className="form-container">
          <label className="heading-label">First name</label>
          <input
            type="text"
            name="username"
            id="username"
            className="input-box"
            onChange={(e) => {
              handleOnChange("fname", e.target.value);
            }}
            value={userLogin.fname}
          />

          <label className="heading-label">Last name</label>
          <input
            type="text"
            name="username"
            id="username"
            className="input-box"
            onChange={(e) => {
              handleOnChange("lname", e.target.value);
            }}
            value={userLogin.lname}
          />
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

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={userLogin.user_type}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Customer"
                control={<Radio />}
                label="Customer"
                onClick={() => {
                  handleOnChange("user_type", "Customer");
                }}
              />
              <FormControlLabel
                value="Banker"
                control={<Radio />}
                label="Banker"
                onClick={() => {
                  handleOnChange("user_type", "Banker");
                }}
              />
            </RadioGroup>
          </FormControl>
          {userLogin.user_type == "Customer" && (
            <TextField
              required
              className="popup-field"
              id="filled-password-input"
              defaultValue={0}
              label="Amount"
              type="number"
              autoComplete="current-password"
              variant="filled"
              value={userLogin.balance_amount}
              onChange={(e) => {
                handleOnChange("balance_amount", e.target.value);
              }}
            />
          )}
          <Button
            variant="contained"
            className="login-button"
            color="primary"
            onClick={() => saveUserLoginData(userLogin)}
          >
            Signup
          </Button>
          <div className="mt-1">
            Don't already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signin;
