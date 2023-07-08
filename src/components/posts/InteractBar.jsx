import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import CommentsModal from "./CommentsModal";

const InteractBar = ({ post }) => {
  const [openComments, setOpenComments] = useState(false);

  const closeComments = () => {
    setOpenComments(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3 p-1 items-center">
      <div>
        <FavoriteIcon /> {post.likes}
      </div>
      <button>
        <FavoriteBorderIcon />
      </button>
      <button onClick={() => setOpenComments(true)}>
        <CommentIcon />
      </button>
      <CommentsModal post={post} open={openComments} close={closeComments} />
    </div>
  );
};

export default InteractBar;
