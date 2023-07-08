const userAction = async (searchQuery) => {
  const response = await fetch(
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" +
      searchQuery +
      "&maxResults=10&order=date&key=AIzaSyC7wUED9uf5QhZQr5ELVL4ei7vwOqrHJzw"
  );
  const responseJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  console.log(responseJson);
};
