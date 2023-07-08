import React, { useEffect, useState } from "react";
import { fetchUserData } from "../../utils/fetchUserData";
import noPfp from "../../img/default_pfp.png";

const Comment = ({ comment }) => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const fetchedData = await fetchUserData(comment.user);
        setAvatar(fetchedData.avatar);
        setName(fetchedData.username);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };
    fetchAvatar();
  }, []);

  const date = comment.time ? new Date(comment.time.seconds * 1000) : null;
  const time = comment.time ? date.toLocaleString() : "Loading";

  return (
    <div>
      <div className="flex align-center items-center gap-3 justify-center p-1">
        <div className="flex flex-col items-center">
          {isLoading ? (
            <span>Loading avatar...</span>
          ) : (
            <img
              src={avatar === "" ? noPfp : avatar}
              className="w-[5vw] lg:[10vw]"
            />
          )}
          <div className="flex flex-col gap-2">
            {isLoading ? <span>Loading...</span> : <p>{name}</p>}
          </div>
        </div>
        <div className="border-[1px] p-2 rounded-[15px] max-w-[80%] whitespace-normal flex flex-col items-center">
          <small>{time}</small>
          <div className="flex flex-wrap break-all">
            <p>{comment.comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
