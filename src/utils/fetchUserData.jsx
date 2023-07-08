import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../fbConfig";

export const fetchUserData = async (email) => {
  const usersRef = collection(db, "users");

  const usersDocs = await getDocs(query(usersRef, where("email", "==", email)));

  const userData = usersDocs.docs[0].data();
  delete userData.password;
  return userData;
};
