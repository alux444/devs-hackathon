import React, { useContext, useState } from "react";
import SideBar from "./SideBar";
import HomePage from "./HomePage";
import { PageContext } from "../../App";
import SearchPage from "./SearchPage";
import WorkoutsPage from "./WorkoutsPage";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";
import bg from "../../img/default1.svg";

const Home = () => {
  const { page } = useContext(PageContext);

  const backgroundImage = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="w-[90vw] h-[90vh] flex lg:flex-col justify-center">
      <div className="h-[90vh] lg:h-[20vh]">
        <SideBar />
      </div>
      <div
        className="w-[75vw] lg:w-[90vw] h-full lg:h-[100%] flex justify-center"
        style={backgroundImage}
      >
        {page == "home" && <HomePage />}
        {page == "search" && <SearchPage />}
        {page == "workout" && <WorkoutsPage />}
        {page == "profile" && <ProfilePage />}
        {page == "settings" && <SettingsPage />}
      </div>
    </div>
  );
};

export default Home;
