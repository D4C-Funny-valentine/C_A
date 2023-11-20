import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import MessageContainer from "./MessageContainer";
import { useAddMessageMutation } from "../redux/services/userApi";

const ChatContainer = ({ currentUser, chattingUser, socket }) => {
  const [addMessage] = useAddMessageMutation();
  const [messages, setMessages] = useState([]);
  const [receive, setReceive] = useState(null);

  const sendMessage = async (msg) => {
    try {
      const { data, error } = await addMessage({
        from: currentUser._id,
        to: chattingUser._id,
        message: msg,
      });

      if (data?.success) {
        socket.current.emit("send-message", {
          from: currentUser._id,
          to: chattingUser._id,
          message: msg,
        });

        const newMsg = {
          isSender: true,
          message: msg,
          senderId: currentUser._id,
        };
        const msgs = [...messages, newMsg];
        setMessages(msgs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-message", (msg) => {
        console.log(msg);
        setReceive({
          isSender: false,
          message: msg,
          senderId: chattingUser._id,
        });
      });
    }
  }, [messages]);

  useEffect(() => {
    receive && setMessages((prev) => [...prev, receive]);
  }, [receive]);

  return (
    <div className="flex w-full h-full">
      {chattingUser && (
        <div className="pt-4 w-full flex flex-col">
          <div className="flex w-full justify-between px-4 mb-auto">
            <div className="flex justify-center items-center gap-3">
              <div className="">
                <img
                  src={`data:image/svg+xml;base64,${chattingUser.avatarImage}`}
                  alt="avatar"
                  className="w-14 h-14 object-contain"
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
          <MessageContainer
            chattingUser={chattingUser}
            currentUser={currentUser}
            messages={messages}
            setMessages={setMessages}
            socket={socket}
          />
          <ChatInput
            sendMessage={sendMessage}
            socket={socket}
            chattingUser={chattingUser}
          />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
