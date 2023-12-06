import * as React from "react";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./AccountList.css";
import "./CustomerList.css";
import { Cookies } from "react-cookie";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import axios from "axios";
import AccountList from "./AccountList";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

const CustomerList = (props) => {
  const [accountsData, setAccountsData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { customersData } = props;
  if (customersData.length <= 0) {
    return <div>no records found</div>;
  }
  const cookies = new Cookies();

  

  
  // const rows = [
  //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //     createData('Eclair', 262, 16.0, 24, 6.0),
  //     createData('Cupcake', 305, 3.7, 67, 4.3),
  //     createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  const getUserAccounts = async (id) => {
    const token = cookies.get("token");
    if (token != undefined) {
      const postObj = {
        "user_id": id,
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
    }
  };

  return (
    <div className="accounts-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* {keys.map((val)=>(
                <TableCell align="right">{val}</TableCell>
            ))} */}
              <TableCell>Customer Id</TableCell>
              <TableCell align="right">Customer First Name</TableCell>
              <TableCell align="right">Customer Last Name</TableCell>
              <TableCell align="right">Customer Balance</TableCell>
              <TableCell align="right">Customer Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customersData.map((obj) => (
              <TableRow
                className="cell-data"
                key={obj._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={()=>{
                    getUserAccounts(obj._id);
                    handleOpen();
                }}
              >
                <TableCell component="th" scope="row">
                  {obj._id}
                </TableCell>
                <TableCell align="right">{obj.fname}</TableCell>
                <TableCell align="right">{obj.lname}</TableCell>
                <TableCell align="right">{obj.balance_amount}</TableCell>
                <TableCell align="right">{obj.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <AccountList accountsData = {accountsData}/> */}
          <AccountList accountsData={accountsData}/>
          
        </Box>
      </Modal>
    </div>
  );
};

export default CustomerList;
