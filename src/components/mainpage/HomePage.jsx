import React, { useEffect, useState } from "react";
import fetchAllPosts from "../../utils/fetchAllPosts";

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

  return (
    <div>
      HomePage
      <button onClick={test}>aa</button>
    </div>
  );
};

export default HomePage;
