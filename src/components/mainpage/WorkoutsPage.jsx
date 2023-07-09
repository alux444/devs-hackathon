import React, { useEffect, useState } from "react";

const WorkoutsPage = () => {
  const [search, setSearch] = useState("chest exercises");
  const [data, setData] = useState([]);
  const [exercise, setExercise] = useState(false);
  const [workout, setWorkout] = useState(false);
  const [chosen, setChosen] = useState(null);

  const bodyParts = [
    "Legs",
    "Hamstrings",
    "Quads",
    "Calves",
    "Chest",
    "Shoulders",
    "Biceps",
    "Triceps",
    "Lats",
    "Abs",
    "Back",
    "Cardio",
  ];
  const workoutChoices = [
    "Full body",
    "Upper body",
    "Lower Body",
    "Legs",
    "Arms",
    "Shoulders",
    "Chest",
    "Cardio",
  ];

  const reset = () => {
    setChosen(null);
    setExercise(false);
    setWorkout(false);
  };

  const returnSelect = () => {
    setChosen(null);
  };

  const selectChoice = async (choice) => {
    setChosen(choice);
  };
  // const getBooks = async () => {
  //   const books = await fetchBooks(search);
  //   console.log(books);
  //   setData(books);
  // };

  // useEffect(() => {
  //   getBooks();
  // }, []);

  return (
    <div className="h-full flex flex-col gap-3 items-center justify-center w-full border-[1px]">
      <h2 className="title">Exercise Finder</h2>
      {!workout && !exercise && (
        <div className="item fade-in">
          <p>Im looking for...</p>
          <div className="flex gap-3">
            <button onClick={() => setWorkout(true)}>A Workout</button>
            <button onClick={() => setExercise(true)}>An Exercise</button>
          </div>
        </div>
      )}
      {exercise && !chosen && (
        <div className="flex justify-center flex-col items-center gap-4 fade-in">
          <small>Select Bodypart</small>
          <div className="flex flex-wrap justify-center w-[50%] gap-2">
            {bodyParts.map((bodypart) => (
              <button
                onClick={() => selectChoice(bodypart)}
                key={bodypart}
                className="fade-in"
              >
                {bodypart}
              </button>
            ))}
          </div>
          <button onClick={reset}>
            <small>Back</small>
          </button>
        </div>
      )}
      {workout && !chosen && (
        <div className="flex justify-center flex-col items-center gap-4 fade-in">
          <small>Select workout</small>
          <div className="flex flex-wrap justify-center w-[50%] gap-2">
            {workoutChoices.map((choice) => (
              <button
                onClick={() => selectChoice(choice)}
                key={choice}
                className="fade-in"
              >
                {choice}
              </button>
            ))}
          </div>
          <button onClick={reset}>
            <small>Back</small>
          </button>
        </div>
      )}
      {chosen && (
        <div className="flex flex-col gap-4 fade-in">
          <small>Your search:</small>
          <p>
            {chosen} {exercise ? "Exercises" : "Workouts"}
          </p>
          <p>Suggested Videos</p>
          <p>Suggested Books</p>
          <button onClick={returnSelect}>
            <small>Back</small>
          </button>
          <button onClick={reset}>
            <small>Reset</small>
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutsPage;
