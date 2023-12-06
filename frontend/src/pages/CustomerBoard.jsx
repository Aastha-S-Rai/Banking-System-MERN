import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import AccountList from "../components/AccountList";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import "./CustomerBoard.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomerBoard = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const userToken = cookies.get("token");
  const user = cookies.get("user");

  const defaultTransactionData = {
    user_id: user._id,
    transaction_type: "",
    transaction_amount: 0,
    transaction_date: "",
  };

  const [accountsData, setAccountsData] = useState([]);
  const [transactionData, setTransactionData] = useState(
    defaultTransactionData
  );

  const [openWithdraw, setOpenWithdraw] = useState(false);
  const handleOpenWithdraw = () => {
    setOpenWithdraw(true);
    setTransactionData({
      ...transactionData,
      transaction_type: "withdraw",
    });
  };
  const handleCloseWithdraw = () => setOpenWithdraw(false);

  const [openDeposit, setOpenDeposit] = useState(false);
  const handleOpenDeposit = () => {
    setOpenDeposit(true);
    setTransactionData({
      ...transactionData,
      transaction_type: "deposit",
    });
  };
  const handleCloseDeposit = () => setOpenDeposit(false);

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

  const updateAmount = async () => {
    console.log("TDATA BEFORE ==>",transactionData);
    if(transactionData.transaction_type != "" && transactionData.transaction_amount != 0){
      const date = new Date()
      setTransactionData({
        ...transactionData,
        transaction_date: date,
      });
      console.log("TDATA AFTER ==>",transactionData);
      try {
        const response = await axios.post(
          "http://localhost:4000/accounts/add",transactionData
        );
        console.log("RESPONSE:", response);
  
        if (response.data.res) {
          alert(response.data.res);
          if(transactionData.transaction_type == "deposit" && response.data.status == 1){
            user.balance_amount = Number(user.balance_amount) + Number(transactionData.transaction_amount);
          }
          if(transactionData.transaction_type == "withdraw" && response.data.status == 1){
            user.balance_amount = Number(user.balance_amount) - Number(transactionData.transaction_amount);
          }
          cookies.set('user', user);
          navigate('/dashboard');
        }
        else{
          alert(response.data.err);
        }
      } catch (error) {
        alert("Failed");
      }
    }
    else{
      alert("Please fill the correct info");
    }
  }

  const clearCookies = () => {
    cookies.remove("user");
    cookies.remove("token");
    navigate("/");
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
              <Button color="inherit" onClick={handleOpenWithdraw}>
                Withdraw
              </Button>
              <Button color="inherit" onClick={handleOpenDeposit}>
                Deposit
              </Button>
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
      <AccountList accountsData={accountsData} />

      <Modal
        open={openWithdraw}
        onClose={handleCloseWithdraw}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Withdraw
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your Balance amount is: {user.balance_amount}
          </Typography>
          <TextField
            required
            className="popup-field"
            id="filled-password-input"
            label="Amount"
            type="number"
            autoComplete="current-password"
            variant="filled"
            value={transactionData.transaction_amount}
            onChange={(e) => {
              setTransactionData({
                ...transactionData,
                transaction_amount: e.target.value,
              });
            }}
          />
          <br />
          <Button variant="contained" className="popup-button" color="primary" onClick={()=> {
            updateAmount();
          }}>
            Withdraw
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openDeposit}
        onClose={handleCloseDeposit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deposit
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your Balance amount is: {user.balance_amount}
          </Typography>
          <TextField
            required
            className="popup-field"
            id="filled-password-input"
            label="Amount"
            type="number"
            autoComplete="current-password"
            variant="filled"
            value={transactionData.transaction_amount}
            onChange={(e) => {
              setTransactionData({
                ...transactionData,
                transaction_amount: e.target.value,
              });
            }}
          />
          <br />
          <Button variant="contained" className="popup-button" color="primary" onClick={()=> {
            updateAmount();
          }}>
            Deposit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomerBoard;
