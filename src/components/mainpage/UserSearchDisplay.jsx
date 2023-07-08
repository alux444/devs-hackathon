import React from "react";

const UserSearchDisplay = ({ user }) => {
  return (
    <div className="mt-2 flex gap-2 items-center">
      <img
        src={
          user.avatar == ""
            ? "https://firebasestorage.googleapis.com/v0/b/devs-hackathon.appspot.com/o/images%2Fdefault_pfp.png?alt=media&token=0b96cfc4-fd7d-4a3b-a716-b49f46d302a5"
            : user.avatar
        }
        className="w-[5vw] lg:w-[9vw]"
      />
      {user.username}
      <button>Visit Profile</button>
    </div>
  );
};

export default UserSearchDisplay;
