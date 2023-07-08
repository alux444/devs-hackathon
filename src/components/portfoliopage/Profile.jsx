import React, { useEffect, useState } from "react";
import { fetchPostUser } from "../../utils/fetchPostUser";
import PostContainer from "../posts/PostContainer";
import { fetchUserData } from "../../utils/fetchUserData";

const Profile = ({ email }) => {
  const [bio, setBio] = useState("");
  const [profileData, setProfileData] = useState([]);

  const fetchProfilePosts = async () => {
    const data = await fetchPostUser(email);
    const sortedArray = data.sort((a, b) => b.time.seconds - a.time.seconds);
    setProfileData(sortedArray);
  };

  const fetchBio = async () => {
    const data = await fetchUserData(email);
    setBio(data.bio);
  };

  useEffect(() => {
    fetchProfilePosts();
    fetchBio();
  }, []);

  const posts = profileData.map((post) => (
    <PostContainer post={post} key={post.id} />
  ));

  return (
    <div className="h-full flex flex-col justify-between border-[1px] w-[75vw] lg:w-[90vw]">
      <div className="flex items-center flex-col p-2">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/devs-hackathon.appspot.com/o/images%2Fdefault_pfp.png?alt=media&token=0b96cfc4-fd7d-4a3b-a716-b49f46d302a5"
          className="w-[10vw] rounded-[25px]"
        />
        <h2>{email}</h2>
        <p>{bio}</p>
      </div>
      <div className="border-2 overflow-auto flex flex-col items-center h-[60vh]">
        {posts}
      </div>
    </div>
  );
};

export default Profile;
