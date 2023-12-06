import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import AccountList from "../components/AccountList";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const CustomerBoard = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [accountsData, setAccountsData] = useState([]);
  const userToken = cookies.get("token");
  if (!userToken) {
    navigate("/");
  }
  const user = cookies.get("user");

  const getData = async () => {
    const user_id = user._id;
    const postObj = {
      user_id: user_id,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/accounts/get",
        postObj
      );
      console.log("RESPONSE:", response);

      if (response.data.res) {
        setAccountsData(response.data.res);
        // alert(user.balance_amount);
      }
    } catch (error) {
      alert("Failed");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="nav-container">
        <Box sx={{ flexGrow: 1 }} color="info">
          <AppBar position="static" color="info">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Accounts
              </Typography>
              <Button color="inherit">Logout</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <AccountList accountsData={accountsData} />
    </div>
  );
};

export default CustomerBoard;
