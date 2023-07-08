import React, { useEffect, useState } from "react";
import { fetchPostUser } from "../../utils/fetchPostUser";
import Post from "../posts/Post";

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState([]);

  const fetchProfilePosts = async (email) => {
    const data = await fetchPostUser(email);
    setProfileData(data);
  };

  useEffect(() => {
    fetchProfilePosts();
  }, []);

  const posts = profileData.map((post) => {
    <Post post={post} key={post.id} />;
  });

  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      {posts}
    </div>
  );
};

export default Profile;
