const getBooks = async (searchQuery) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=10&order=date&key=AIzaSyC7wUED9uf5QhZQr5ELVL4ei7vwOqrHJzw`
    );
    const responseJson = await response.json();
    const result = [];
    responseJson.items.map((item) => {
      const url = item.volumeInfo.previewLink;
      const title = item.volumeInfo.title;
      const thumbnail = item.volumeInfo.imageLinks.thumbnail;
      const authors = item.volumeInfo.authors;
      let bookObject = {
        url: url,
        title: title,
        thumbnail: thumbnail,
        authors: authors,
      };
      result.push(bookObject);
    });

    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default getBooks;
