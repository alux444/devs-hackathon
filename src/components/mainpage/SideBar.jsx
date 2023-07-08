import React, { useContext, useState } from "react";
import CreatePostModal from "../posts/CreatePostModal";
import { PageContext } from "../../App";

const SideBar = () => {
  const [openNewPost, setOpenNewPost] = useState(false);
  const { setPage } = useContext(PageContext);

  const closeNewPost = () => {
    setOpenNewPost(false);
  };

  return (
    <div className="w-[20vw] border-2 h-[100%] flex flex-col gap-1">
      SideBar
      <button onClick={() => setOpenNewPost(true)}>Create New Post</button>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("search")}>Search</button>
      <button onClick={() => setPage("workout")}>Workouts</button>
      <button onClick={() => setPage("profile")}>Profile</button>
      <button>Settings</button>
      {openNewPost && (
        <CreatePostModal open={openNewPost} close={closeNewPost} />
      )}
    </div>
  );
};

export default SideBar;
