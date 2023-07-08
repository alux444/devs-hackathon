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
    <div className="overflow-auto flex flex-col w-[75vw] lg:h-[82vh] lg:w-[90vw] p-3 border-[1px]">
      <p className="title">Zinstagram</p>
      <div className="flex flex-col items-center">{mappedPosts}</div>
    </div>
  );
};

export default HomePage;
