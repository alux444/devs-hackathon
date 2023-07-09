import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../fbConfig";

export const fetchAllWorkouts = async (email) => {
  const data = [];
  const workoutsRef = collection(db, "workouts");

  const workoutsDocs = await getDocs(
    query(workoutsRef, where("user", "==", email))
  );

  workoutsDocs.docs.map((item) => {
    data.push(item.data());
  });

  return data;
};
