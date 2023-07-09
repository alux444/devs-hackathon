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
