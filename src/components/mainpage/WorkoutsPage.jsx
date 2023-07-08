import React, { useEffect, useState } from "react";

const WorkoutsPage = () => {
  const [search, setSearch] = useState("chest exercises");
  const [data, setData] = useState([]);

  // const getBooks = async () => {
  //   const books = await fetchBooks(search);
  //   console.log(books);
  //   setData(books);
  // };

  // useEffect(() => {
  //   getBooks();
  // }, []);

  return (
    <div className="h-full flex flex-col items-center justify-between w-[75vw] lg:w-[90vw] border-[1px] lg:h-[82vh]">
      <h2>Exercise Finder</h2>
    </div>
  );
};

export default WorkoutsPage;
