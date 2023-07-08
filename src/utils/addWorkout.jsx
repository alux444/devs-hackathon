import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../fbConfig";

const addWorkout = async (email, exercises) => {
  const workoutRef = collection(db, "workouts");
  const workoutId = uuidv4();

  const create = async () => {
    await addDoc(workoutRef, {
      time: serverTimestamp(),
      user: email,
      exercises: exercises,
      id: workoutId,
    });
  };

  create();
  return true;
};

export default addWorkout;
