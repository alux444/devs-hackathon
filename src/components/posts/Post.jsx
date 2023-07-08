import React from "react";
import InteractBar from "./InteractBar";

const Post = ({ post }) => {
  return (
    <div>
      <div>
        <h2>poster</h2>
      </div>
      <div>
        <p>Workout</p>
      </div>
      <div>
        <InteractBar />
      </div>
    </div>
  );
};

export default Post;
