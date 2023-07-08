import React, { useEffect, useState } from "react";
import { fetchPostUser } from "../../utils/fetchPostUser";
import PostContainer from "../posts/PostContainer";
import { fetchUserData } from "../../utils/fetchUserData";

const Profile = ({ email }) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    bio: "",
    email: "",
    avatar: "",
  });
  const [profileData, setProfileData] = useState([]);

  const fetchProfilePosts = async () => {
    const data = await fetchPostUser(email);
    const sortedArray = data.sort((a, b) => b.time.seconds - a.time.seconds);
    setProfileData(sortedArray);
  };

  const fetchInfos = async () => {
    const data = await fetchUserData(email);
    setUserInfo(data);
  };

  useEffect(() => {
    fetchProfilePosts();
    fetchInfos();
  }, []);

  const posts = profileData.map((post) => (
    <PostContainer post={post} key={post.id} />
  ));

  return (
    <div className="h-full flex flex-col items-center justify-between max-w-[75vw] lg:max-w-[90vw]">
      <div className="flex items-center flex-col p-2">
        <img
          src={
            userInfo.avatar == ""
              ? "https://firebasestorage.googleapis.com/v0/b/devs-hackathon.appspot.com/o/images%2Fdefault_pfp.png?alt=media&token=0b96cfc4-fd7d-4a3b-a716-b49f46d302a5"
              : userInfo.avatar
          }
          className="w-[5vw] lg:w-[9vw]"
        />
        <h2>{userInfo.username}</h2>
        <p>{userInfo.bio}</p>
      </div>
      <div className="border-[1px] p-2 overflow-auto flex flex-col items-center max-h-[60vh] max-w-[90%]">
        {profileData.length == 0 ? (
          <div>
            <p>No posts yet :(</p>
          </div>
        ) : (
          posts
        )}
      </div>
    </div>
  );
};

export default Profile;
