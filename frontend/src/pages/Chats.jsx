import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button, Modal, FormControl, InputLabel } from "@mui/material";
import "./forms.css";
import { Cookies } from "react-cookie";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
// import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "90vh",
    borderTop: "2px solid black",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

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

const Chats = () => {
  const cookie = new Cookies();
  const user = cookie.get("user");
  const socket = io("http://localhost:4000");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const defaultTextData = {
    sender: true,
    message: "",
    senderEmail: user.email,
    receiverEmail: "",
    timestamp: Date.now(),
  };
  const [textData, setTextData] = useState(defaultTextData);
  const [chatList, setChatList] = useState([]);
  const defaultValue = {
    receiveremail: "",
    receiverphone: 0,
    senderid: user._id,
    senderemail: user.email,
  };

  const [formValue, setFormValue] = useState(defaultValue);

  const handleChange = (key, value) => {
    console.log("KEY=>", key, " VALUE=>", value);
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [key]: value,
    }));
    console.log(formValue);
  };
  const classes = useStyles();

  const handleSubmit = () => {
    console.log("SUBMIT DATA ===> ", formValue);
    try {
      socket.emit("message", formValue);

      socket.on("add_user", (data) => {
        console.log("ADD USER DATA ====> ", data);
      });
    } catch {
      alert("something went wrong");
    }
  };

  const handleTextChange = (key, value) => {
    console.log("KEY=>", key, " VALUE=>", value);
    setTextData((prevFormValue) => ({
      ...prevFormValue,
      [key]: value,
    }));
  };
  let displayValue = undefined;
  const handleTextSubmit = () => {
    socket.emit("text", textData);
    displayValue = true
    setChatList([...chatList, textData]);
  };

  useEffect(() => {
    try {
      socket.on("connect", () => {
        console.log(`Connected with ID: ${socket.id}`);
        // cookie.set("socket", socket);
      });
    } catch {
      alert("Connection cannot be made");
    }
  }, []);
  return (
    <div className="main-container">
      <div>
        <Grid container>
          <Grid item xs={12} className="headerSection">
            <Typography variant="h5" className="header-message">
              Chat Section
            </Typography>
            <Button variant="contained" color="success" onClick={handleOpen}>
              Add participant
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="mainModal"
            >
              <Box sx={style} className="boxModal">
                <div className="modalForm">
                  <FormControl className="formControl">
                    <div>
                      {/* <InputLabel htmlFor="my-input">Participant Email</InputLabel> */}
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        placeholder="participant email"
                        value={formValue.email}
                        color="warning"
                        focused
                        onChange={(e) => {
                          handleChange("email", e.target.value);
                        }}
                      />
                    </div>

                    <div>
                      {/* <InputLabel htmlFor="my-input">
                Participant's Phone number
              </InputLabel> */}
                      <TextField
                        id="outlined-number"
                        label="Participant's Phone Number"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className="textField"
                        color="warning"
                        value={formValue.phone}
                        focused
                        onChange={(e) => {
                          handleChange("phone", e.target.value);
                        }}
                      />
                    </div>

                    <div>
                      {/* <InputLabel htmlFor="my-input">Your Email</InputLabel> */}
                      <TextField
                        id="outlined-read-only-input"
                        label="Read Only"
                        defaultValue={user.email}
                        value={user.email}
                        InputProps={{
                          readOnly: true,
                        }}
                        focused
                      />
                    </div>

                    <button
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Submit
                    </button>
                  </FormControl>
                </div>
              </Box>
            </Modal>
          </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={classes.borderRight500}>
            <List>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="John Wick"></ListItemText>
              </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: "10px" }}>
              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Divider />
            <List>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                <ListItemText secondary="online" align="right"></ListItemText>
              </ListItem>
              <ListItem button key="Alice">
                <ListItemIcon>
                  <Avatar
                    alt="Alice"
                    src="https://material-ui.com/static/images/avatar/3.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Alice">Alice</ListItemText>
              </ListItem>
              <ListItem button key="CindyBaker">
                <ListItemIcon>
                  <Avatar
                    alt="Cindy Baker"
                    src="https://material-ui.com/static/images/avatar/2.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={9}>
            <List className={classes.messageArea}>
              {chatList.map((item, index) => (
                <>
                {item.sender ? (
                  <ListItem key={index}>
                
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        align="right"
                        primary={item.message}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align="right"
                        secondary="09:31"
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
                ) : (
                  <ListItem key="1">
                      {console.log("HERE FALSE")}
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            align="left"
                            primary="res"
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align="left"
                            secondary="09:30"
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                )}
                    
                    
                </>
              ))}
            </List>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                  value={textData.message}
                  onChange={(e) => {
                    handleTextChange("message", e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={1} align="right">
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => {
                    handleTextSubmit();
                  }}
                >
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Chats;
