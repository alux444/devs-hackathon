import React, { useEffect, useState } from "react";
import fetchAllPosts from "../../utils/fetchAllPosts";
import PostContainer from "../posts/PostContainer";

const HomePage = () => {
  const [data, setData] = useState([]);

  const getPosts = async () => {
    const results = await fetchAllPosts();
    const sortedArray = results.sort((a, b) => b.time.seconds - a.time.seconds);
    setData(sortedArray);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const mappedPosts = data.map((post) => {
    return <PostContainer key={post.id} post={post} />;
  });

  return (
    <div className="flex flex-col w-full p-2 h-full">
      <p className="title">Zinstagram</p>
      <small>Latest Posts</small>
      <div className="flex flex-col items-center w-full max-h-[85%] overflow-auto border-[1px]">
        {mappedPosts}
      </div>
    </div>
  );
};

export default HomePage;
