import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../fbConfig";

export const likePost = async (postid, user) => {
  const postsRef = collection(db, "posts");
  const postQuery = query(postsRef, where("id", "==", postid));

  const postDocs = await getDocs(postQuery);

  if (postDocs.size > 0) {
    const postDoc = postDocs.docs[0];
    const postData = postDoc.data();
    const likes = postData.likes || [];

    const updatedLikes = likes.includes(user.email)
      ? likes.filter((email) => email !== user.email)
      : [...likes, user.email];

    await updateDoc(postDoc.ref, { likes: updatedLikes });
    return !likes.includes(user.email);
  } else {
    console.log("Post not found");
  }
};
