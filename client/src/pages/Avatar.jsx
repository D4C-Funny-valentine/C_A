import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAvatarMutation } from "../redux/services/authApi";
import Cookies from "js-cookie";
import "./page.css";
import { arrayBufferToBase64 } from "../utils/arrayBuffetToBase64";
import axios from "axios";
import Loader from "../components/Loader";

const Avatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const api = "https://api.multiavatar.com/34567";

  const [avatar] = useAvatarMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const data = [];

        for (let i = 0; i < 4; i++) {
          const response = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`,
            { responseType: "arraybuffer" }
          );

          const buffer = arrayBufferToBase64(response.data);
          data.push(buffer);
        }

        setAvatars(data);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };

    fetchAvatar();
  }, []);

  const selectedAvatarHandler = async () => {
    if (selectedAvatar === null) {
      toast.error("Please select an avatar");
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      const image = avatars[selectedAvatar];
      try {
        const { data, error } = await avatar({
          id: user._id,
          data: { image },
        });
        console.log(data);
        if (data?.success) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("user", JSON.stringify(user));
          toast.success(data.message);
          navigate("/");
        } else {
          console.log(error);
          toast.error(error.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (avatars.length === 0) {
    return <Loader />;
  }
  return (
    <div className="h-screen bg-dark-blue flex justify-center items-center flex-col gap-8">
      <div className="">
        <h3 className="text-white font-bold text-3xl">
          Pick an avatar as your profile picture
        </h3>
      </div>
      <div className="flex justify-center items-center gap-8">
        {avatars.map((avatar, index) => (
          <div
            className={`${
              selectedAvatar === index
                ? "border-light-blue"
                : "border-transparent"
            } p-2 border-4 duration-500 rounded-full cursor-pointer`}
            key={index}
            onClick={() => setSelectedAvatar(index)}
          >
            <img
              src={`data:image/svg+xml;base64,${avatar}`}
              alt="avatar"
              className="lg:w-24 lg:h-24 md:w-24 md:h-24 w-20 h-20 object-contain"
            />
          </div>
        ))}
      </div>
      <div className="flex">
        <button
          onClick={selectedAvatarHandler}
          type="submit"
          className="text-white bg-solid-purple hover:bg-light-blue duration-500 px-8 py-3 rounded-md font-bold w-full active:scale-95"
        >
          Select Your Avatar
        </button>
      </div>
    </div>
  );
};

export default Avatar;
