import React, { useState } from "react";
import SideBar from "./SideBar";
import HomePage from "./HomePage";

const Home = () => {
  return (
    <div className="w-screen h-[90vh] border-2 flex">
      <SideBar />
      <HomePage />
    </div>
  );
};

export default Home;
