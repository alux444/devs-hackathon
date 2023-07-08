import React, { useContext, useState } from "react";
import CreatePostModal from "../posts/CreatePostModal";
import { PageContext } from "../../App";
import AddWorkoutModal from "../posts/AddWorkoutModal";

const SideBar = () => {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [openNewWorkout, setOpenNewWorkout] = useState(false);
  const { setPage } = useContext(PageContext);

  const closeNewPost = () => {
    setOpenNewPost(false);
  };

  const closeAddWorkout = () => {
    setOpenNewWorkout(false);
  };

  return (
    <div className="w-[20vw] border-2 h-[100%] flex flex-col gap-1">
      SideBar
      <button onClick={() => setOpenNewWorkout(true)}>Add Workout</button>
      <button onClick={() => setOpenNewPost(true)}>Create New Post</button>
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
    </div>
  );
};

export default SideBar;
