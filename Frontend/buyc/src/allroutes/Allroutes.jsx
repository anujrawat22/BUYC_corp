import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dealers from "../pages/Dealers";
import BuyCars from "../pages/BuyCars";
import Cars from "../pages/Cars";
import CreateCar from "../pages/CreateCar";
import ShowCars from "../pages/ShowCars";

function Allroutes() {
  return (
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/dealers" element={<Dealers />}></Route>
      <Route path="/buycars" element={<BuyCars />}></Route>
      <Route path="/cars" element={<Cars />}></Route>
      <Route path="/createcar" element={<CreateCar />}></Route>
      <Route path="/showcars" element={<ShowCars />}></Route>
    </Routes>
  );
}

export default Allroutes;
