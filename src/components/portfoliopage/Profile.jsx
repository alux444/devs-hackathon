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
    <div className="h-full flex flex-col justify-between border-2 w-[75vw]">
      <div className="flex items-center flex-col p-2">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/devs-hackathon.appspot.com/o/images%2Fdefault_pfp.png?alt=media&token=0b96cfc4-fd7d-4a3b-a716-b49f46d302a5"
          className="w-[10vw] rounded-[25px]"
        />
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
