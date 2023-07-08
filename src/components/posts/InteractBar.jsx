import React, { useContext, useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import CommentsModal from "./CommentsModal";
import { UserContext } from "../../App";
import { likePost } from "../../utils/likePost";

const InteractBar = ({ post }) => {
  const { user } = useContext(UserContext);
  const [currentLikes, setCurrentLikes] = useState(post.likes.length);
  const [openComments, setOpenComments] = useState(false);

  const closeComments = () => {
    setOpenComments(false);
  };

  const handleLike = async () => {
    const liked = await likePost(post.id, user);
    if (liked) {
      setCurrentLikes(currentLikes + 1);
    } else {
      setCurrentLikes(currentLikes - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3 p-1 items-center">
      <div>
        <FavoriteIcon /> {currentLikes}
      </div>
      <button onClick={handleLike}>
        <FavoriteBorderIcon />
      </button>
      <button onClick={() => setOpenComments(true)}>
        <CommentIcon />
      </button>
      {openComments && (
        <CommentsModal post={post} open={openComments} close={closeComments} />
      )}
    </div>
  );
};

export default InteractBar;
