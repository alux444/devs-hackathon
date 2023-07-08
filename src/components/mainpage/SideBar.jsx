import React, { useContext, useEffect, useState } from "react";
import CreatePostModal from "../posts/CreatePostModal";
import { PageContext, UserContext } from "../../App";
import AddWorkoutModal from "../posts/AddWorkoutModal";
import Login from "../loginpage/Login";
import logo from "../../img/logo.svg";
import { fetchUserData } from "../../utils/fetchUserData";

const SideBar = () => {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openNewWorkout, setOpenNewWorkout] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // Added state for menu visibility
  const { user, setUser } = useContext(UserContext);
  const { setPage } = useContext(PageContext);

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
      <img src={logo} className="max-w-[15vw]" />
      {user.loggedIn && (
        <small className="block lg:hidden">
          Welcome to Zinstagram, {user.username}
        </small>
      )}

      {!user.loggedIn && (
        <button onClick={() => setOpenLogin(true)}>Log in</button>
      )}
      {user.loggedIn ? (
        <div className="flex block lg:hidden">
          <button onClick={() => setOpenNewWorkout(true)}>Add Workout</button>
          <button onClick={() => setOpenNewPost(true)}>Create New Post</button>
        </div>
      ) : (
        <small>Login to Post!</small>
      )}
      <div className="flex flex-col lg:hidden">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("search")}>Search</button>
        <button onClick={() => setPage("workout")}>Workouts</button>
        <button onClick={() => setPage("profile")}>Profile</button>
        <button>Settings</button>
      </div>
      <button
        className="hidden lg:block"
        onClick={() => setShowMenu(!showMenu)}
      >
        Menu
      </button>

      {showMenu && (
        <div className="lg:block absolute border-2">
          <div className="flex items-center justify-center border-[1px] p-2 bg-[rgba(0,0,0,0.7)] rounded-[20px]">
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("search")}>Search</button>
            <button onClick={() => setPage("workout")}>Workouts</button>
            <button onClick={() => setPage("profile")}>Profile</button>
            <button>Settings</button>
            <button onClick={() => setShowMenu(false)}>X</button>
          </div>
        </div>
      )}

      {user.loggedIn && (
        <div className="flex flex-col items-center">
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
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
