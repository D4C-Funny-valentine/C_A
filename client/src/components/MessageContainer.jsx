import React, { useEffect, useRef, useState } from "react";
import {
  useDeleteMessageMutation,
  useGetAllMessagesMutation,
} from "../redux/services/userApi";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./chat.css";

const MessageContainer = ({
  chattingUser,
  currentUser,
  messages,
  setMessages,
  receive,
}) => {
  const [getAllMessages] = useGetAllMessagesMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [deleteMessageId, setDeleteMessageId] = useState(null);
  const [messageData, setMessageData] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await getAllMessages({
          from: currentUser._id,
          to: chattingUser._id,
        });
        setMessages(data);
        setMessageData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [chattingUser, currentUser, receive, messages]);

  const scrollRef = useRef();

  // auto scroll to bottom when user messages are added
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);

  const handleDeleteMessage = async (messageId) => {
    try {
      const { data, error } = await deleteMessage({
        id: messageId,
        requester: currentUser._id,
      });

      if (data?.success) {
        const updatedMessages = messages.filter(
          (message) => message.id !== messageId
        );
        setMessages(updatedMessages);
        setShowDeleteButton(false);
        setDeleteMessageId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-dark-blue sm:bg-black/70 md:bg-black/70 lg:bg-black/70 w-full h-full overflow-scroll overflow-x-hidden overflow-y-scroll chat-container-scroll relative">
      <div
        className="w-full flex justify-end items-end flex-col mt-auto"
        ref={scrollRef}
      >
        {messageData?.map((message) => (
          <div className="w-full" key={message.id} ref={scrollRef}>
            <div
              className={`message ${
                message.isSender
                  ? "sended justify-end"
                  : "received justify-start"
              } w-full flex p-2.5 items-center`}
            >
              <div
                className={`flex items-center ${
                  message.isSender ? "justify-end" : "justify-start"
                } w-full`}
              >
                {currentUser._id === message.senderId && (
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
                )}
                <div className="max-w-[40%]">
                  <div
                    onDoubleClick={() => {
                      handleDeleteMessage(message.id);
                    }}
                    className={`content ${
                      message.isSender ? "bg-[#4f04ff2a]" : "bg-[#003cff20]"
                    } p-4 w-full break-words rounded-2xl`}
                  >
                    <p className="text-[#d1d1d1]">{message.message}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {message.updatedAt}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="" ref={scrollRef}></div>
      </div>
    </div>
  );
};

export default MessageContainer;
