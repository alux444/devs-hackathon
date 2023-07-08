import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../fbConfig";

export const editUserAvatar = async (email, imgUrl) => {
  const usersRef = collection(db, "users");

  const userDocs = await getDocs(query(usersRef, where("email", "==", email)));
  if (!userDocs.empty) {
    const userDoc = userDocs.docs[0];
    const userDocRef = doc(usersRef, userDoc.id);
    await updateDoc(userDocRef, { avatar: imgUrl });
    return true;
  }

  return false;
};
