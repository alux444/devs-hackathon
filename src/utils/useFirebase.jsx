import { useContext } from "react";
import { UserContext } from "../App";
import { addDoc, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../fbConfig";
import { query } from "firebase/database";

const useFirebase = () => {
  const { setUser } = useContext(UserContext);
  const usersRef = collection(db, "users");

  const createUser = async (email, googleUser, password) => {
    const username = email.split("@")[0];
    const querySnapshot = await getDocs(
      query(usersRef, where("email", "==", email))
    );

    if (querySnapshot.empty) {
      if (googleUser) {
        await addDoc(usersRef, {
          username: username,
          email: email,
          avatar: "",
          bio: "",
        });
      } else {
        await addDoc(usersRef, {
          username: username,
          email: email,
          password: password,
          avatar: "",
          bio: "",
        });
      }
    }
  };

  const googleAttemptLogin = async (email) => {
    const querySnapshot = await getDocs(
      query(usersRef, where("email", "==", email))
    );

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const username = userData.username;
      setUser({ loggedIn: true, username: username, email: email });
      localStorage.setItem("loggedInUser", JSON.stringify({ username, email }));
      return true;
    } else {
      const username = email.split("@")[0];
      createUser(email, true);
      setUser({ loggedIn: true, username: username, email: email });
      localStorage.setItem("loggedInUser", JSON.stringify({ username, email }));
      return true;
    }
  };

  const validateEmail = async (email) => {
    const querySnapshot = await getDocs(
      query(usersRef, where("email", "==", email))
    );

    if (!querySnapshot.empty) {
      return true;
    }

    return false;
  };

  const attemptLogin = async (email, password) => {
    const querySnapshot = await getDocs(
      query(usersRef, where("email", "==", email))
    );

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      if (password == userData.password) {
        const username = userData.username;
        setUser({ loggedIn: true, username: username, email: email });
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ username, email })
        );
        return true;
      }
    }

    return false;
  };

  const fetchAllUsers = async () => {
    const data = [];
    const usersRef = collection(db, "users");

    const postsDocs = await getDocs(query(usersRef));

    postsDocs.docs.map((item) => {
      data.push(item.data());
    });

    return data;
  };

  return {
    createUser,
    googleAttemptLogin,
    validateEmail,
    attemptLogin,
    fetchAllUsers,
  };
};

export default useFirebase;
