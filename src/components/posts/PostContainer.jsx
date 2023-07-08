import React from "react";

const PostContainer = ({ post }) => {
  const date = post.time ? new Date(post.time.seconds * 1000) : null;
  const time = post.time ? date.toLocaleString() : "Loading";

  return (
    <div className="items-center justify-center align-center gap-4 flex p-[10px] mt-[10px] mb-[10px] border-[1px] border-solid border-white w-[90%]">
      <div className="flex flex-col gap-2 border-2">
        <p>
          {post.username} at {time}
        </p>
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
    </div>
  );
};

export default PostContainer;
