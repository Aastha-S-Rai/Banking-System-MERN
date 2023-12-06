import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const Home = () => {
  const cookies = new Cookies();
  const user = cookies.get('user');
  console.log(user)
  if(user){
    return (
        <div>Hello World</div>
    );
  }
  else{
    return <Navigate replace to="/" />;
  }
  
};

export default Home;