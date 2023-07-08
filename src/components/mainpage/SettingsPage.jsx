import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { fetchUserData } from "../../utils/fetchUserData";
import addImage from "../../utils/addImage";
import noPfp from "../../img/default_pfp.png";
import { useEditUser } from "../../utils/useEditUser";

const SettingsPage = () => {
  const { user } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [bio, setBio] = useState("");
  const [data, setData] = useState(null);

  const { editUserAvatar, editUserBio } = useEditUser();

  const onChangeImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    const imageURL = URL.createObjectURL(image); // Get the source image URL
    setImageURL(imageURL);
  };

  const onChangeBio = (e) => {
    if (e.target.value.length < 50) {
      setBio(e.target.value);
    }
  };

  const fetchData = async () => {
    const info = await fetchUserData(user.email);
    setData(info);
    setBio(info.bio);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (file) {
      const url = await addImage(file);
      await editUserAvatar(user.email, url);
    }
    if (bio !== data.bio) {
      await editUserBio(user.email, bio);
    }
    setMessage("Success! Reload the page.");
  };

  return (
    <div className="h-full flex flex-col gap-3 items-center justify-center w-[75vw] lg:w-[90vw] border-[1px] p-3 lg:h-[82vh]">
      <h2 className="title">Settings</h2>
      <div className="flex align-center fade-in">
        <label htmlFor="image-upload" className="relative">
          <div className="file-input-mask">
            <div className="flex align-center items-center justify-center text-center">
              <input
                id="image-upload"
                type="file"
                className="file-input"
                onChange={onChangeImage}
                accept=".jpg,.jpeg,.png"
              />
              <p className="overlay border-2 flex justify-center items-center text-center align-center text-xl text-white font-bold cursor-pointer">
                New Profile Picture?
              </p>
              <div className="relative">
                {data && (
                  <img
                    src={
                      !imageURL
                        ? data.avatar === ""
                          ? noPfp
                          : data.avatar
                        : imageURL
                    }
                    className="max-h-[40vh] border rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </label>
      </div>
      <div className="fade-in">
        <div>
          <small>Email</small>
          <h2>{user.email}</h2>
        </div>
        <div>
          <small>Username</small>
          <h2>{user.username}</h2>
        </div>
        {data && (
          <div className="flex flex-col">
            <label>Bio</label>
            <textarea
              className="border-[1px] w-[27vw] lg:w-[40vw] md:w-[65vw]"
              value={bio}
              onChange={onChangeBio}
            />
          </div>
        )}
        <button onClick={onSubmit}>Submit</button>
        <small>{message}</small>
      </div>
    </div>
  );
};

export default SettingsPage;
