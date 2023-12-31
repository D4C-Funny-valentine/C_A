import React, { useEffect, useRef, useState } from "react";
import {
  useDeleteMessageMutation,
  useGetAllMessagesMutation,
} from "../redux/services/userApi";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./chat.css";
import MessageDeleteButton from "./MessageDeleteButton";

const MessageContainer = ({
  chattingUser,
  currentUser,
  messages,
  setMessages,
  receive,
  newMessage,
}) => {
  const [getAllMessages] = useGetAllMessagesMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [deleteMessageId, setDeleteMessageId] = useState(null);
  const [messageData, setMessageData] = useState([]);
  const containerRef = useRef(null);
  const [deleteMessageData, setDeleteMessageData] = useState();

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
  }, [chattingUser, currentUser, receive, newMessage, deleteMessageData]);

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
        setDeleteMessageId(null);
        setDeleteMessageData(data.deleteMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Calculate the total height by summing up the heights of each message
    const totalHeight = Array.from(containerRef.current.children).reduce(
      (acc, child) => acc + child.offsetHeight,
      0
    );

    // Scroll to the bottom taking into account the total height
    containerRef.current.scrollTop = totalHeight;
  }, [messages, receive, newMessage]);

  return (
    <div
      ref={containerRef}
      className="bg-dark-blue sm:bg-black/70 md:bg-black/70 lg:bg-black/70 w-full h-full overflow-scroll overflow-x-hidden overflow-y-scroll chat-container-scroll relative"
    >
      <div className="w-full flex justify-end items-end flex-col mt-auto gap-2">
        {messageData?.map((message) => (
          <div className="w-full" key={message.id}>
            <div
              className={`message ${
                message.isSender
                  ? "sended justify-end"
                  : "received justify-start"
              } w-full flex items-center`}
            >
              <div
                className={`flex items-center ${
                  message.isSender ? "justify-end" : "justify-start"
                } w-full`}
              >
                {currentUser._id === message.senderId && (
                  <MessageDeleteButton
                    deleteMessageId={deleteMessageId}
                    setDeleteMessageId={setDeleteMessageId}
                    handleDeleteMessage={handleDeleteMessage}
                    message={message}
                  />
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
      </div>
    </div>
  );
};

export default MessageContainer;
