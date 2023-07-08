import React, { useContext, useState } from "react";
import CreatePostModal from "../posts/CreatePostModal";
import { PageContext, UserContext } from "../../App";
import AddWorkoutModal from "../posts/AddWorkoutModal";
import Login from "../loginpage/Login";
import logo from "../../img/logo.svg";

const SideBar = () => {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openNewWorkout, setOpenNewWorkout] = useState(false);
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
    <div className="w-[20vw] border-2 h-[100%] flex flex-col gap-1">
      <img src={logo} />
      {user.loggedIn && <small>Welcome to Zinstagram, {user.username}</small>}
      {user.loggedIn ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => setOpenLogin(true)}>Log in</button>
      )}
      {user.loggedIn ? (
        <div>
          <button onClick={() => setOpenNewWorkout(true)}>Add Workout</button>
          <button onClick={() => setOpenNewPost(true)}>Create New Post</button>
        </div>
      ) : (
        <small>Login to Post!</small>
      )}
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("search")}>Search</button>
      <button onClick={() => setPage("workout")}>Workouts</button>
      <button onClick={() => setPage("profile")}>Profile</button>
      <button>Settings</button>
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
