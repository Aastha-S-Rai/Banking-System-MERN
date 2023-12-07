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

const AccountList = (props) => {
  const { accountsData } = props;
  if (accountsData.length <= 0) {
    return <div>no records found</div>;
  }
  const rows = [];
  const keys = Object.keys(accountsData[0]);
  console.log("DATA -->", keys);
  keys.pop();
  keys.shift();
  // const rows = [
  //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //     createData('Eclair', 262, 16.0, 24, 6.0),
  //     createData('Cupcake', 305, 3.7, 67, 4.3),
  //     createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  return (
    <div className="accounts-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* {keys.map((val)=>(
                <TableCell align="right">{val}</TableCell>
            ))} */}
              <TableCell>Transaction ID</TableCell>
              <TableCell align="right">Transaction Type</TableCell>
              <TableCell align="right">Transaction Amount</TableCell>
              <TableCell align="right">Transaction Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accountsData.map((obj) => (
              <TableRow
                key={obj._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {obj._id}
                </TableCell>
                <TableCell align="right">{obj.transaction_type}</TableCell>
                <TableCell align="right">{obj.transaction_amount}</TableCell>
                <TableCell align="right">
                  {moment(obj.transaction_date).format(`D MMM 'YY, @ hh:mm A`)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AccountList;
