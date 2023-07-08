import React, { useState } from "react";
import Profile from "../portfoliopage/Profile";

const UserSearchDisplay = ({ user }) => {
  const [showProfile, setShowProfile] = useState(false);

  const visitProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="mt-2 flex gap-2 items-center relative">
      <img
        src={
          user.avatar == ""
            ? "https://firebasestorage.googleapis.com/v0/b/devs-hackathon.appspot.com/o/images%2Fdefault_pfp.png?alt=media&token=0b96cfc4-fd7d-4a3b-a716-b49f46d302a5"
            : user.avatar
        }
        className="w-[5vw] lg:w-[9vw]"
      />
      {user.username}
      <button onClick={() => setShowProfile(true)}>Visit Profile</button>
      {showProfile && (
        <div className="absolute">
          <Profile user={user.email} />
        </div>
      )}
    </div>
  );
};

export default UserSearchDisplay;
