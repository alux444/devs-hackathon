import React, { useState } from "react";
import useFirebase from "../../utils/useFirebase";
import { useEffect } from "react";
import UserSearchDisplay from "./UserSearchDisplay";
const SearchPage = () => {
  const [username, setUsername] = useState("");
  const { fetchAllUsers } = useFirebase();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchAllUsers();
      setUsers(fetchedUsers);
    };

    getUsers();
  }, []);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  const filterExercises = users.filter((val) => {
    if (val.username.toLowerCase().includes(username.toLowerCase())) {
      return val;
    }
  });
  const display = filterExercises.map((user) => {
    return <UserSearchDisplay user={user} key={user.email} />;
  });

  return (
    <div className="text-black flex flex-col items-center justify-center w-[75vw] lg:w-[90vw]">
      <input
        className="w-[50vw] h-[6vh] border-2 rounded-full pl-5 mt-2"
        onChange={handleUsernameChange}
        placeholder="Search for a user.."
        value={username}
      />
      <h3 className="font-bold text-xl mt-4">Users</h3>
      <div className="flex flex-col items-center">{display}</div>
    </div>
  );
};

export default SearchPage;
