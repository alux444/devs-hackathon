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
  const filteredUsers = users.filter((val) => {
    if (val.username.toLowerCase().includes(username.toLowerCase())) {
      return val;
    }
  });
  const display = filteredUsers.map((user) => {
    return <UserSearchDisplay user={user} key={user.email} />;
  });

  return (
    <div className="text-white flex flex-col  gap-3 items-center justify-center w-[75vw] lg:w-[90vw] lg:h-[82vh] border-[1px]">
      <h2 className="title">User Search</h2>
      <input
        className="w-[50vw] h-[6vh] border-2 rounded-full pl-5 mt-2"
        onChange={handleUsernameChange}
        placeholder="Search for a user.."
        value={username}
      />
      <div className="flex flex-col items-center border-[1px] p-3 rounded-lg overflow-auto max-h-[50vh] max-w-[90%]">
        {filteredUsers.length == 0 ? <p>No users found.</p> : display}
      </div>
    </div>
  );
};

export default SearchPage;
