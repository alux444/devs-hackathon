import React, { useState } from "react";
import Profile from "../portfoliopage/Profile";
import noPfp from "../../img/default_pfp.png";

const UserSearchDisplay = ({ user }) => {
  const [showProfile, setShowProfile] = useState(false);

  const visitProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="mt-2 flex gap-2 items-center">
      <img
        src={user.avatar == "" ? noPfp : user.avatar}
        className="w-[5vw] lg:w-[9vw]"
      />
      {user.username}
      <button onClick={() => setShowProfile(true)}>Visit Profile</button>
      {showProfile && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute bg-black rounded-lg p-4">
            <Profile email={user.email} />
            <button className="mt-3" onClick={() => setShowProfile(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearchDisplay;
