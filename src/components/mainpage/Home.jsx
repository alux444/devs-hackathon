import React, { useContext, useState } from "react";
import SideBar from "./SideBar";
import HomePage from "./HomePage";
import { PageContext } from "../../App";
import SearchPage from "./SearchPage";
import WorkoutsPage from "./WorkoutsPage";
import ProfilePage from "./ProfilePage";

const Home = () => {
  const { page } = useContext(PageContext);

  return (
    <div className="w-screen h-[90vh] border-2 flex">
      <SideBar />
      {page == "home" && <HomePage />}
      {page == "search" && <SearchPage />}
      {page == "workout" && <WorkoutsPage />}
      {page == "profile" && <ProfilePage />}
    </div>
  );
};

export default Home;
