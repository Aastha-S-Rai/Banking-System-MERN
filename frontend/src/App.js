import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import BankerBoard from "./pages/BankerBoard.jsx";
import CustomerBoard from "./pages/CustomerBoard.jsx";
import Signin from "./pages/Signin.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/BankerBoard" element={<BankerBoard />} />
          <Route path="/dashboard" element={<CustomerBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
