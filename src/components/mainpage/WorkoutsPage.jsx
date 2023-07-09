import React, { useEffect, useState } from "react";
import fetchBooks from "../../utils/fetchBooks";
import fetchVideo from "../../utils/fetchVideo";
import { getCoord } from "../../utils/fetchGyms";

const WorkoutsPage = () => {
  const [books, setBooks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [gym, setGym] = useState(null);
  const [exercise, setExercise] = useState(false);
  const [workout, setWorkout] = useState(false);
  const [chooseBooks, setChooseBooks] = useState(false);
  const [chooseGym, setChooseGym] = useState(false);
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
  const bookChoices = [
    "Bodybuilding",
    "Fitness",
    "Sports Science",
    "Weight Loss",
  ];

  const reset = () => {
    setChosen(null);
    setExercise(false);
    setWorkout(false);
    setChooseBooks(false);
    setChooseGym(false);
  };

  const returnSelect = () => {
    setChosen(null);
  };

  const getBooks = async (choice) => {
    const books = await fetchBooks(choice);
    setBooks(books);
  };

  const getVideos = async (choice) => {
    const vids = await fetchVideo(choice);
    setVideos(vids);
  };

  const fetchGyms = async () => {
    setChooseGym(true);
    const coords = await getCoord();
    const url = `https://www.google.com/maps/search/gyms/@${coords.latitude},${coords.longitude}`;
    setGym(url);
    return;
  };

  const chooseSpec = async (choice) => {
    if (exercise) {
      await getVideos(choice + "exercises");
      setChosen(choice);
      return;
    } else if (workout) {
      await getVideos(choice + "workouts");
      setChosen(choice);
    } else if (chooseBooks) {
      await getBooks(choice);
      setChosen(choice);
    }
  };

  const mappedBooks = books.map((book) => {
    const fixedTitle = book.title.replace(/(&amp;|&#39;)/g, "");
    const authors = book.authors.join(", ");
    return (
      <div
        key={fixedTitle}
        className="border-[1px] p-2 w-[50%] flex flex-col items-center justify-center"
      >
        <p className="w-[20vw]">{fixedTitle}</p>
        <a href={book.url} target="_blank" rel="noreferrer">
          <img src={book.thumbnail} className="h-[10vh]" />
        </a>
        <p>{authors}</p>
      </div>
    );
  });

  const mappedVids = videos.map((video) => {
    const fixedTitle = video.title.replace(/(&amp;|&#39;)/g, "");
    return (
      <div
        key={fixedTitle}
        className="border-[1px] p-2 w-[50%] flex flex-col items-center"
      >
        <p className="w-[20vw]">{fixedTitle}</p>
        <a href={video.url} target="_blank" rel="noreferrer">
          <img src={video.thumbnail} className="h-[10vh]" />
        </a>
      </div>
    );
  });

  return (
    <div className="h-full flex flex-col gap-3 items-center alignc justify-center w-full border-[1px]">
      <h2 className="title">Exercise Finder</h2>
      {!workout && !exercise && !chooseBooks && !chooseGym && (
        <div className="item fade-in">
          <p className="mb-2">Im looking for...</p>
          <div className="flex gap-3 flex-wrap justify-center ">
            <button onClick={() => setWorkout(true)}>A Workout</button>
            <button onClick={() => setExercise(true)}>An Exercise</button>
            <button onClick={() => setChooseBooks(true)}>A Book</button>
            <button onClick={() => fetchGyms()}>A Gym</button>
          </div>
        </div>
      )}
      {exercise && !chosen && (
        <div className="flex justify-center flex-col items-center gap-4 fade-in">
          <small>Select Bodypart</small>
          <div className="flex flex-wrap justify-center w-[50%] gap-2">
            {bodyParts.map((bodypart) => (
              <button
                onClick={() => chooseSpec(bodypart)}
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
                onClick={() => chooseSpec(choice)}
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
      {chooseBooks && !chosen && (
        <div className="flex justify-center flex-col items-center gap-4 fade-in">
          <small>Select Book Theme</small>
          <div className="flex flex-wrap justify-center w-[50%] gap-2">
            {bookChoices.map((choice) => (
              <button
                onClick={() => chooseSpec(choice)}
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
      {chooseGym && (
        <div className="flex flex-col gap-4 fade-in w-full justify-center items-center">
          <small>Gyms Near Your Location</small>
          <a href={gym} rel="noreferrer" target="_blank">
            <button>Google Maps</button>
          </a>
          <button onClick={reset}>
            <small>Back</small>
          </button>
        </div>
      )}
      {chosen && (
        <div className="flex flex-col gap-4 fade-in w-full justify-center items-center">
          <small>Your search:</small>
          <p>
            {chosen} {exercise && "Exercises"}
            {workout && "Workouts"}
            {chooseBooks && "Books"}
          </p>
          <div className="flex w-[90%] border-[1px] overflow-auto h-[80%]">
            {chooseBooks && mappedBooks}
            {(workout || exercise) && mappedVids}
          </div>
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
