import { Modal } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import useOutsideClick from "../../utils/useOutsideClose";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserContext } from "../../App";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../fbConfig";

const AddWorkoutModal = ({ open, close }) => {
  const { user } = useContext(UserContext);
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState(false);
  const [caption, setCaption] = useState("");
  const postRef = collection(db, "workouts");
  const modalRef = useRef(null);

  useOutsideClick(modalRef, close);

  const onSubmit = async (e) => {
    e.preventDefault();
    const postId = uuidv4();

    const captionData = caption;

    const createNewPost = async () => {
      await addDoc(postRef, {
        time: serverTimestamp(),
        user: user.email,
        caption: captionData,
        id: postId,
      });
    };

    createNewPost();
    close();
  };

  return (
    <Modal open={open}>
      <div className="w-[100%] h-[100%] items-center align-center justify-center flex">
        <div
          ref={modalRef}
          className="border-2 border-solid border-white p-[25px] text-center items-center"
        >
          {newExercise ? (
            <div className="flex flex-col gap-2">
              <label>Exercise Name</label>
              <input type="text" />
              <button>Add Exercise</button>
              <button onClick={() => setNewExercise(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h2>New Workout</h2>
              <form className="flex flex-col gap-2" onSubmit={onSubmit}>
                <label>Name Workout</label>
                <input type="text" />
                <button type="button" onClick={() => setNewExercise(true)}>
                  Add exercise
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddWorkoutModal;
