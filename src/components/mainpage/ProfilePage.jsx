import React, { useContext } from "react";
import { UserContext } from "../../App";
import Profile from "../portfoliopage/Profile";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.email == "" ? (
        <p>Login to view your profile.</p>
      ) : (
        <Profile user={user.email} />
      )}
    </div>
  );
};

export default ProfilePage;
