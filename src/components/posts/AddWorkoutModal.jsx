import { Modal } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import useOutsideClick from "../../utils/useOutsideClose";
import { UserContext } from "../../App";
import ExerciseForm from "./ExerciseForm";
import addWorkout from "../../utils/addWorkout";

const AddWorkoutModal = ({ open, close }) => {
  const { user } = useContext(UserContext);
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState(false);
  const modalRef = useRef(null);

  useOutsideClick(modalRef, close);

  const addExercise = (exercise) => {
    const tempExercises = [...exercises, exercise];
    setExercises(tempExercises);
  };

  const closeForm = () => {
    setNewExercise(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(await addWorkout(user.email, exercises));
  };

  const mapped = exercises.map((exercise, index) => (
    <div key={exercise.name}>
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
