import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../fbConfig";

export const fetchPostUser = async (email) => {
  const data = [];
  const postsRef = collection(db, "posts");

  const postsDocs = await getDocs(query(postsRef, where("email", "==", email)));

  postsDocs.docs.map((item) => {
    data.push(item.data());
  });

  return data;
};
