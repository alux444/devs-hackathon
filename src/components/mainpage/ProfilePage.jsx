import React, { useContext } from "react";
import { UserContext } from "../../App";
import Profile from "../portfoliopage/Profile";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full h-full">
      <Profile email={user.email} />
    </div>
  );
};

export default ProfilePage;
