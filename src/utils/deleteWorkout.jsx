import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../fbConfig";

const deleteWorkout = async (id) => {
  const workoutRef = collection(db, "workouts");

  const currentItem = await getDocs(query(workoutRef, where("id", "==", id)));

  if (!currentItem.empty) {
    const itemDbId = currentItem.docs[0].id;
    await deleteDoc(doc(workoutRef, itemDbId));
    return true;
  }

  return false;
};

export default deleteWorkout;
