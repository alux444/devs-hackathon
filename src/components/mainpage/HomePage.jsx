import React, { useEffect, useState } from "react";
import fetchAllPosts from "../../utils/fetchAllPosts";
import PostContainer from "../posts/PostContainer";

const HomePage = () => {
  const [data, setData] = useState([]);

  const getPosts = async () => {
    const results = await fetchAllPosts();
    setData(results);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const mappedPosts = data.map((post) => {
    return <PostContainer key={post.id} post={post} />;
  });

  return (
    <div className="overflow-auto flex border-2 flex-col w-[75vw]">
      <p>Home</p>
      <div className="flex flex-col items-center">{mappedPosts}</div>
    </div>
  );
};

export default HomePage;
