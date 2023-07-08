import { Modal } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import useOutsideClick from "../../utils/useOutsideClose";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserContext } from "../../App";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../fbConfig";

const CreatePostModal = ({ open, close }) => {
  const { user } = useContext(UserContext);
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const storage = getStorage();
  const postRef = collection(db, "posts");
  const modalRef = useRef(null);

  useOutsideClick(modalRef, close);

  const onChangeCaption = (e) => {
    if (e.target.value.length < 250) {
      setCaption(e.target.value);
    }
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const postId = uuidv4();

    const captionData = caption;
    let url = "";

    if (selectedImage) {
      try {
        setUploading(true);
        const storageRef = ref(storage, "images/" + postId);
        await uploadBytes(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(storageRef);
        url = downloadURL;
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }

    const createNewPost = async () => {
      await addDoc(postRef, {
        time: serverTimestamp(),
        user: user.email,
        image: url,
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
          <form onSubmit={onSubmit}>
            <label className="block mb-2">Select Image (optional)</label>
            <div className="flex items-center justify-center mb-2">
              <input
                type="file"
                onChange={onChangeImage}
                accept=".jpg,.jpeg,.png"
                className="border-[1px] border-solid border-white w-[100%] p-[10px]"
              />
              <br />
            </div>
            <label className="block mb-2">Enter caption</label>
            <textarea
              value={caption}
              onChange={onChangeCaption}
              className="border-[1px] border-solid border-white w-[100%] p-[10px] h-[20vh]"
            />
            {uploading && <small>Uploading your post...</small>}
            <button type="submit">Post!</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
