import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";

const addImage = async (imageFile, id) => {
  const storage = getStorage();
  const storageRef = ref(storage, "images/" + id);
  let url = "";

  try {
    await uploadBytes(storageRef, imageFile);
    url = await getDownloadURL(storageRef);
  } catch (error) {
    console.log("Error uploading image:", error);
  }

  return url;
};

export default addImage;
