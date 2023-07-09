export const getCoord = async () => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBG5AH-uneq08LTCp4MrgvMd-XIg2SrI1M",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ considerIp: "true" }),
      }
    );

    const data = await response.json();
    const latitude = data.location.lat;
    const longitude = data.location.lng;

    return { latitude, longitude };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const getGyms = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${latitude},${longitude}&query=gyms%20nearby&maxResults=10&type=gym&key=AIzaSyBG5AH-uneq08LTCp4MrgvMd-XIg2SrI1M`
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
