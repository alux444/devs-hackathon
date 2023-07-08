import { Modal } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import useOutsideClick from "../../utils/useOutsideClose";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserContext } from "../../App";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../fbConfig";
import ExerciseForm from "./ExerciseForm";

const AddWorkoutModal = ({ open, close }) => {
  const { user } = useContext(UserContext);
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState(false);
  const postRef = collection(db, "workouts");
  const modalRef = useRef(null);

  useOutsideClick(modalRef, close);

  const addExercise = (exercise) => {
    const tempExercises = [...exercises, exercise];
    setExercises(tempExercises);
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const postId = uuidv4();

  //   const captionData = caption;

  //   const createNewPost = async () => {
  //     await addDoc(postRef, {
  //       time: serverTimestamp(),
  //       user: user.email,
  //       caption: captionData,
  //       id: postId,
  //     });
  //   };

  //   createNewPost();
  //   close();
  // };

  const closeForm = () => {
    setNewExercise(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(exercises);
  };

  const mapped = exercises.map((exercise, index) => (
    <div key={index}>
      <p>{exercise.name}</p>
      {exercise.sets.map((set) => (
        <div
          className="flex gap-3 flex-wrap justify-center align-center items-center"
          key={index}
        >
          <small>
            {set.weight}
            {set.units} x {set.reps}
          </small>
        </div>
      ))}
    </div>
  ));

  return (
    <Modal open={open}>
      <div className="w-[100%] h-[100%] items-center align-center justify-center flex">
        <div
          ref={modalRef}
          className="border-2 border-solid border-white p-[25px] text-center items-center bg-[black]"
        >
          {newExercise ? (
            <div className="flex flex-col gap-2">
              <ExerciseForm submit={addExercise} exit={closeForm} />
              <button onClick={closeForm}>Cancel</button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl">New Workout</h2>
              <form className="flex flex-col gap-2" onSubmit={onSubmit}>
                <label>Workout Name</label>
                <input type="text" />
                {mapped}
                <button type="button" onClick={() => setNewExercise(true)}>
                  Add exercise
                </button>
                <button type="submit">Submit Workout</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddWorkoutModal;
