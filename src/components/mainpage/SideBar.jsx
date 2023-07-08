import React from "react";

const SideBar = () => {
  return (
    <div className="w-[20vw] border-2 h-[100%] flex flex-col gap-1">
      SideBar
      <button>Create New Post</button>
      <button>Home</button>
      <button>Search</button>
      <button>Workouts</button>
      <button>Profile</button>
      <button>Settings</button>
    </div>
  );
};

export default SideBar;
