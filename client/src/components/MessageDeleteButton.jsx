import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const MessageDeleteButton = ({
  message,
  deleteMessageId,
  setDeleteMessageId,
  handleDeleteMessage,
}) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  return (
    <div
      className={`flex-1 justify-end flex items-center relative 
    }`}
    >
      <BsThreeDotsVertical
        size={18}
        color="white"
        onClick={() => {
          setShowDeleteButton(!showDeleteButton);
          setDeleteMessageId(message.id);
        }}
        className="cursor-pointer"
      />
      <div
        className={`p-2 bg-[#2600ff34] absolute right-5 cursor-pointer ${
          showDeleteButton && deleteMessageId === message.id
            ? "opacity-100"
            : "opacity-0"
        } duration-300`}
        onClick={() => handleDeleteMessage(message.id)}
      >
        <p className="text-white text-sm">Delete</p>
      </div>
    </div>
  );
};

export default MessageDeleteButton;
