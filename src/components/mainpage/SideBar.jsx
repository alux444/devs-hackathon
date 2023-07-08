import React, { useState } from "react";
import CreatePostModal from "../posts/CreatePostModal";

const SideBar = () => {
  const [openNewPost, setOpenNewPost] = useState(false);

  const closeNewPost = () => {
    setOpenNewPost(false);
  };

  return (
    <div className="w-[20vw] border-2 h-[100%] flex flex-col gap-1">
      SideBar
      <button onClick={() => setOpenNewPost(true)}>Create New Post</button>
      <button>Home</button>
      <button>Search</button>
      <button>Workouts</button>
      <button>Profile</button>
      <button>Settings</button>
      {openNewPost && (
        <CreatePostModal open={openNewPost} close={closeNewPost} />
      )}
    </div>
  );
};

export default SideBar;
