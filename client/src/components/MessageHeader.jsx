import React from "react";
import Logout from "./Logout";
import { FaBars } from "react-icons/fa";

const MessageHeader = ({ chattingUser, open, setPosition, currentUser }) => {
  return (
    <div className="flex w-full mb-auto">
      <div className="w-full sm:block block md:hidden lg:hidden mx-4">
        <div className="flex w-full justify-between border-b-2 border-solid border-solid-purple pb-3">
          <button
            onClick={() => {
              setPosition("left");
              open();
            }}
          >
            <FaBars size={24} color="white" className="font-semibold" />
          </button>
          <div
            className="cursor-pointer flex items-center justify-center gap-4"
            onClick={() => {
              setPosition("right");
              open();
            }}
          >
            <h3 className="text-white font-semibold text-lg">Profile</h3>
            <img
              src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
              className="w-10 h-10 object-contain"
              alt=""
            />
          </div>
        </div>
        <div className="my-2">
          <div className="p-2 bg-solid-purple rounded-md flex justify-between px-3 items-center">
            <img
              src={`data:image/svg+xml;base64,${chattingUser.avatarImage}`}
              alt="avatar"
              className="w-10 h-10 object-contain"
            />
            <h3 className="text-white capitalize text-lg">
              {chattingUser.username}
            </h3>
          </div>
        </div>
      </div>

      <div className="w-full sm:hidden hidden md:block lg:block">
        <div className="flex w-full justify-between px-4 mb-auto items-center">
          <div className="flex justify-center items-center gap-3">
            <div className="">
              <img
                src={`data:image/svg+xml;base64,${chattingUser.avatarImage}`}
                alt="avatar"
                className="w-10 h-10 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-14 lg:h-14 object-contain"
              />
            </div>
            <div className="">
              <h3 className="text-xl text-white font-semibold capitalize">
                {chattingUser.username}
              </h3>
            </div>
          </div>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
