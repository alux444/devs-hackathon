import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { fetchUserData } from "../../utils/fetchUserData";

const SettingsPage = () => {
  const { user } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const onChangeImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const fetchData = async () => {
    const info = await fetchUserData(user.email);
    setData(info);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center w-[75vw] lg:w-[90vw] border-[1px] p-3">
      <div className="flex align-center">
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
                      data.avatar === ""
                        ? "https://firebasestorage.googleapis.com/v0/b/devs-hackathon.appspot.com/o/images%2Fdefault_pfp.png?alt=media&token=0b96cfc4-fd7d-4a3b-a716-b49f46d302a5"
                        : data.avatar
                    }
                    className="max-h-[40vh] border rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </label>
      </div>
      <div>
        <h2>{user.email}</h2>
      </div>
      <div>
        <h2>{user.username}</h2>
      </div>
    </div>
  );
};

export default SettingsPage;
