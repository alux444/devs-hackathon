import React from "react";
import InteractBar from "./InteractBar";

const PostContainer = ({ post }) => {
  const date = post.time ? new Date(post.time.seconds * 1000) : null;
  const time = post.time ? date.toLocaleString() : "Loading";

  return (
    <div className="items-center justify-center align-center gap-4 flex p-[10px] mt-[10px] mb-[10px] border-[1px] border-solid border-white w-[90%]">
      <div className="flex flex-col gap-2 border-2">
        <div className="flex items-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/devs-hackathon.appspot.com/o/images%2Fdefault_pfp.png?alt=media&token=0b96cfc4-fd7d-4a3b-a716-b49f46d302a5"
            className="w-[10vw]"
          />
          <div className="flex flex-col gap-2">
            <p>{post.username}</p>
            <small>{time}</small>
          </div>
        </div>
        <br />
        <img className="max-w-[70vw] max-h-[500px]" src={post.image} />
        <br />
        <p>{post.caption}</p>
      </div>
      <div className="border-2 w-[50%] flex flex-col">
        <h2>{post.workout.name}</h2>
        <div className="flex flex-wrap justify-center">
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
      <InteractBar />
    </div>
  );
};

export default PostContainer;
