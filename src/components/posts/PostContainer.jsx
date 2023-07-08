import React, { useEffect, useState } from "react";
import InteractBar from "./InteractBar";
import { fetchUserData } from "../../utils/fetchUserData";
import noPfp from "../../img/default_pfp.png";
import horizontal from "../../img/horizontal.svg";

const PostContainer = ({ post }) => {
  const backgroundImage = {
    backgroundImage: `url(${horizontal})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const fetchedAvatar = await fetchUserData(post.user);
        setAvatar(fetchedAvatar.avatar);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };
    fetchAvatar();
  }, []);

  const date = post.time ? new Date(post.time.seconds * 1000) : null;
  const time = post.time ? date.toLocaleString() : "Loading";

  return (
    <div
      className="items-center justify-center align-center gap-2 flex p-[10px] mt-[10px] mb-[10px] border-[1px] border-solid rounded-[20px] border-white w-[90%] lg:flex-col fade-in"
      style={backgroundImage}
    >
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          {isLoading ? (
            <span>Loading avatar...</span>
          ) : (
            <img src={avatar === "" ? noPfp : avatar} className="w-[8vw]" />
          )}
          <div className="flex flex-col gap-2">
            <p>{post.username}</p>
            <small>{time}</small>
          </div>
        </div>
        <br />
        {post.image !== "" && (
          <img className="max-w-[50%] max-h-[50%] border-2" src={post.image} />
        )}
        <br />
      </div>
      <div className="max-w-[60%] lg:max-w-[100%] flex flex-col gap-2 max-h-[50vh] overflow-auto">
        <div>
          <p>"{post.caption}"</p>
        </div>
        <div className="rounded-lg border-[1px] p-2">
          <h2>{post.workout.name}</h2>
          <div className="flex flex-wrap justify-center align-center items-center">
            {post.workout.exercises.map((exercise) => (
              <div key={exercise.name} className="p-2">
                <p>{exercise.name}</p>
                <div className="flex flex-wrap flex-col gap-2">
                  {exercise.sets.map((set, index) => (
                    <small key={index}>
                      {set.weight}
                      {set.units} x {set.reps}
                    </small>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <InteractBar post={post} />
    </div>
  );
};

export default PostContainer;
