import React, { useEffect, useState } from "react";
import InteractBar from "./InteractBar";
import { fetchUserData } from "../../utils/fetchUserData";

const CommentPostCont = ({ post }) => {
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

  return (
    <div className="items-center justify-center align-center gap-2 flex p-[10px] mt-[10px] mb-[10px] border-[1px] border-solid rounded-[20px] border-white max-w-[90%] lg:flex-col text-sm">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          {isLoading ? (
            <span>Loading avatar...</span>
          ) : (
            <img
              src={
                avatar === ""
                  ? "https://firebasestorage.googleapis.com/v0/b/devs-hackathon.appspot.com/o/images%2Fdefault_pfp.png?alt=media&token=0b96cfc4-fd7d-4a3b-a716-b49f46d302a5"
                  : avatar
              }
              className="w-[10vw]"
            />
          )}
          <div className="flex flex-col gap-2">
            <p>{post.username}</p>
          </div>
        </div>
        <br />
        <img className="max-w-[70vw] max-h-[500px]" src={post.image} />
        <br />
      </div>
      <div className="max-w-[60%] lg:max-w-[100%] flex flex-col gap-2 max-h-[50vh] overflow-auto">
        <div>
          <p>"{post.caption}"</p>
        </div>
        <div className="border-[1px] p-2">
          <h2>{post.workout.name}</h2>
          <div className="flex flex-wrap justify-center align-center items-center">
            {post.workout.exercises.map((exercise) => (
              <div key={exercise.name} className="p-2">
                <p>{exercise.name}</p>
                <div className="flex flex-wrap flex-col gap-2">
                  {exercise.sets.map((set, index) => (
                    <small key={index}>
                      {set.weight}
                      {set.units}x{set.reps}
                    </small>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPostCont;
