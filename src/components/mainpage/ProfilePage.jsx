import React, { useContext } from "react";
import { UserContext } from "../../App";
import Profile from "../portfoliopage/Profile";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full max-h-full ">
      {user.email == "" ? (
        <h2>Login to view your profile.</h2>
      ) : (
        <Profile email={user.email} />
      )}
    </div>
  );
};

export default ProfilePage;
