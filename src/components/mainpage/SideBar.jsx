import React, { useContext, useEffect, useRef, useState } from "react";
import CreatePostModal from "../posts/CreatePostModal";
import { PageContext, UserContext } from "../../App";
import AddWorkoutModal from "../posts/AddWorkoutModal";
import Login from "../loginpage/Login";
import logo from "../../img/logo.svg";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useOutsideClick from "../../utils/useOutsideClose";

const SideBar = () => {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openNewWorkout, setOpenNewWorkout] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // Added state for menu visibility
  const { user, setUser } = useContext(UserContext);
  const { setPage } = useContext(PageContext);

  const closeMenu = () => {
    setShowMenu(false);
  };

  const menuRef = useRef(null);
  useOutsideClick(menuRef, closeMenu);

  const signOut = () => {
    setUser({ loggedIn: false, username: "", email: "" });
    localStorage.removeItem("loggedInUser");
  };

  const closeNewPost = () => {
    setOpenNewPost(false);
  };

  const closeAddWorkout = () => {
    setOpenNewWorkout(false);
  };

  const closeLogin = () => {
    setOpenLogin(false);
  };

  return (
    <div className="w-[20vw] overflow-auto lg:w-[100%] border-[1px] h-full lg:h-[10vh] flex flex-col lg:flex-row items-center p-2 justify-between">
      <img src={logo} className="max-w-[15vw] lg:max-h-[8vh]" />
      {user.loggedIn && (
        <small className="block lg:hidden">
          Welcome to Zinstagram, {user.username}
        </small>
      )}

      {!user.loggedIn && (
        <button onClick={() => setOpenLogin(true)}>Log in</button>
      )}
      {user.loggedIn ? (
        <div className="flex flex-col lg:hidden">
          <button onClick={() => setOpenNewWorkout(true)}>New Workout</button>
          <button onClick={() => setOpenNewPost(true)}>New Post</button>
        </div>
      ) : (
        <small>Login to Post!</small>
      )}
      <div className="flex flex-col lg:hidden">
        <button onClick={() => setPage("home")}>
          <HomeIcon />
        </button>
        <button onClick={() => setPage("search")}>
          <SearchIcon />
        </button>
        <button onClick={() => setPage("workout")}>
          <FitnessCenterIcon />
        </button>
        <button onClick={() => setPage("profile")}>
          <AccountCircleIcon />
        </button>
        <button onClick={() => setPage("settings")}>
          <SettingsIcon />
        </button>
      </div>

      {showMenu && (
        <div className="lg:flex justify-center items-center absolute w-[88vw] animate-fade-in">
          <div
            className="flex items-center border-[1px] justify-center border-[1px] p-2 bg-[rgba(0,0,0,0.9)] rounded-[20px]"
            ref={menuRef}
          >
            <button onClick={() => setPage("home")}>
              <HomeIcon />
            </button>
            <button onClick={() => setPage("search")}>
              <SearchIcon />
            </button>
            <button onClick={() => setPage("workout")}>
              <FitnessCenterIcon />
            </button>
            <button onClick={() => setPage("profile")}>
              <AccountCircleIcon />
            </button>
            <button onClick={() => setPage("settings")}>
              <SettingsIcon />
            </button>
            <button onClick={() => setShowMenu(false)}>X</button>
          </div>
        </div>
      )}
      <div className="flex gap-1">
        <button
          className="hidden lg:block"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MenuIcon />
        </button>
        {user.loggedIn && (
          <div className="flex flex-col items-center">
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        )}
      </div>
      {openNewPost && (
        <CreatePostModal open={openNewPost} close={closeNewPost} />
      )}
      {openNewWorkout && (
        <AddWorkoutModal open={openNewWorkout} close={closeAddWorkout} />
      )}
      {openLogin && <Login open={openLogin} close={closeLogin} />}
    </div>
  );
};

export default SideBar;
