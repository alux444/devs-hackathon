import React, { useEffect, useState } from "react";
import fetchAllPosts from "../../utils/fetchAllPosts";
import PostContainer from "../posts/PostContainer";

const HomePage = () => {
  const [data, setData] = useState([]);

  const getPosts = async () => {
    const results = await fetchAllPosts();
    setData(results);
  };

  const test = () => {
    console.log(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const mappedPosts = data.map((post) => {
    return <PostContainer key={post.id} post={post} />;
  });

  return (
    <div>
      HomePage
      <button onClick={test}>aa</button>
      {mappedPosts}
    </div>
  );
};

export default HomePage;
