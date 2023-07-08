import React, { useEffect, useState } from "react";
import { fetchPostUser } from "../../utils/fetchPostUser";
import PostContainer from "../posts/PostContainer";
import { fetchUserData } from "../../utils/fetchUserData";
import noPfp from "../../img/default_pfp.png";

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
    <div className="h-full flex flex-col items-center justify-between w-[75vw] lg:w-[90vw] border-[1px]">
      <div className="flex items-center flex-col p-2">
        <img
          src={userInfo.avatar == "" ? noPfp : userInfo.avatar}
          className="h-[20vh]"
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
