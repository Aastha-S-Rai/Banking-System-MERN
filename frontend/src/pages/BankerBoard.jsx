import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import CustomerList from "../components/CustomerList.jsx";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const BankerBoard = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [customersData, setCustomersData] = useState([]);
  const userToken = cookies.get("token");
  console.log("Token", userToken);

  const getData = async () => {
    const postObj = {
      "user_type": "Customer"
    };
    try {
      const response = await axios.post(
        "https://bankinsystem1.onrender.com/users/get",postObj
      );
      console.log("RESPONSE:", response);

      if (response.data.res) {
        setCustomersData(response.data.res);
        // alert(user.balance_amount);
      }
    } catch (error) {
      alert("Failed");
    }
  };

  const clearCookies = () => {
    cookies.remove("user");
    cookies.remove("token");
    navigate("/");
  };

  if (userToken == undefined) {
    navigate("/");
  }
  useEffect(() => {
    if (userToken == undefined) {
        navigate("/");
    }
    else{
        getData();
    }
  }, []);

  return (
    <div>
      <div className="nav-container">
        <Box sx={{ flexGrow: 1 }} color="info">
          <AppBar position="static" color="info">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Customers
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  clearCookies();
                }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <CustomerList customersData={customersData} />
    </div>
  );
};

export default BankerBoard;
