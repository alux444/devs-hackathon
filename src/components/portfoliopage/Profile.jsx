import React, { useEffect, useState } from "react";
import { fetchPostUser } from "../../utils/fetchPostUser";
import PostContainer from "../posts/PostContainer";

const Profile = ({ email }) => {
  const [profileData, setProfileData] = useState([]);

  const fetchProfilePosts = async () => {
    console.log(email);
    const data = await fetchPostUser(email);
    setProfileData(data);
  };

  useEffect(() => {
    fetchProfilePosts();
  }, []);

  const posts = profileData.map((post) => (
    <PostContainer post={post} key={post.id} />
  ));

  return (
    <div className="h-full flex flex-col justify-between border-2">
      <div>
        <p>pfp</p>
        <h2>{email}</h2>
        <p>bio</p>
      </div>
      <div className="border-2 overflow-auto flex flex-col items-center h-[60vh]">
        {posts}
      </div>
    </div>
  );
};

export default Profile;
