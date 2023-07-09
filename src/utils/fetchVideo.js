const fetchVideo = async (searchQuery) => {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=10&key=${
      import.meta.env.VITE_GOOG_KEYF
    }`
  );
  const responseJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  let result = [];

  responseJson.items.map((item) => {
    const url = `https://www.youtube.com/watch?v=${item.id.videoId}`;
    const title = item.snippet.title;
    const thumbnail = item.snippet.thumbnails.default.url;
    let bookObject = { url: url, title: title, thumbnail: thumbnail };
    result.push(bookObject);
  });

  return result;
};

export default fetchVideo;
