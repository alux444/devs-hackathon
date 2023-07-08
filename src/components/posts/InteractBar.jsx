import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

const InteractBar = () => {
  return (
    <div className="flex flex-col gap-3 p-1">
      <button>
        <FavoriteBorderIcon />
      </button>
      <button>
        <CommentIcon />
      </button>
    </div>
  );
};

export default InteractBar;
