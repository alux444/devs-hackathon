const fetchGyms = async () => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=gyms%20nearby&maxResults=10&type=gym&key=AIzaSyBG5AH-uneq08LTCp4MrgvMd-XIg2SrI1M`
    );
    const responseJson = await response.json();
    const result = [];
    await Promise.all(
      responseJson.results.map(async (item) => {
        const address = item.formatted_address;
        const url =
          "https://www.google.com/maps/place/?q=place_id:" + item.place_id;
        const name = item.name;
        const photoReference = item.photos[0].photo_reference; // get first image
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?&maxwidth=400&photo_reference=${photoReference}&key=AIzaSyBG5AH-uneq08LTCp4MrgvMd-XIg2SrI1M`;
        const photoResponse = await fetch(photoUrl);
        const photoBlob = await photoResponse.blob();
        const rating = item.rating;
        const bookObject = {
          url: url,
          name: name,
          address: address,
          photo: photoBlob,
          rating: rating,
        };
        result.push(bookObject);
      })
    );

    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
export default fetchGyms;
