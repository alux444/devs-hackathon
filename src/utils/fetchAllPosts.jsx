import { db } from "../../fbConfig";
import { collection, getDocs, query } from "firebase/firestore";

const fetchAllPosts = async () => {
  const data = [];
  const postsRef = collection(db, "posts");

  const postsDocs = await getDocs(query(postsRef));

  postsDocs.docs.map((item) => {
    data.push(item.data());
  });

  return data;
};

export default fetchAllPosts;
