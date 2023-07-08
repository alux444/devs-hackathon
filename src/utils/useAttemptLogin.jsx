import { collection, getDocs, where } from "firebase/firestore";
import { db } from "../../fbConfig";
import { query } from "firebase/database";

export const useAttemptLogin = () => {
  const userRef = collection(db, "user");
  const adminRef = collection(db, "adminLogin");

  const userAttempt = async (form) => {
    const userDoc = await getDocs(
      query(userRef, where("email", "==", form.email))
    );

    if (!userDoc.empty) {
      const data = userDoc.docs[0].data();
      if (data.password == form.password) {
        return true;
      }
    }

    return false;
  };

  const adminAttempt = async (form) => {
    const adminDoc = await getDocs(
      query(adminRef, where("username", "==", form.username))
    );

    if (!adminDoc.empty) {
      const data = adminDoc.docs[0].data();
      if (data.password == form.password) {
        return true;
      }
    }

    return false;
  };

  return { userAttempt, adminAttempt };
};
