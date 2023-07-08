import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const addImage = async (imageFile) => {
  const storage = getStorage();
  const id = uuidv4();
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
