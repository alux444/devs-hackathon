import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../fbConfig";

const addNewComment = async (comment, user, postid) => {
  const commentRef = collection(db, "comments");
  const commentid = uuidv4();

  const create = async () => {
    await addDoc(commentRef, {
      comment: comment,
      user: user.email,
      postid: postid,
      commentid: commentid,
      time: serverTimestamp(),
    });
  };

  create();
};

export default addNewComment;
