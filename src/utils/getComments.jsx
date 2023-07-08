import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../fbConfig";

export const getComments = async (postid) => {
  const data = [];
  const postsRef = collection(db, "comments");

  const postsDocs = await getDocs(
    query(postsRef, where("postid", "==", postid))
  );

  postsDocs.docs.map((item) => {
    data.push(item.data());
  });

  return data;
};
