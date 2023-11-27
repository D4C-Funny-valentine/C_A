import React, { useEffect, useState } from "react";

import ChatInput from "./ChatInput";
import MessageContainer from "./MessageContainer";
import { useAddMessageMutation } from "../redux/services/userApi";
import MessageHeader from "./MessageHeader";

const ChatContainer = ({
  currentUser,
  chattingUser,
  socket,
  open,
  setPosition,
}) => {
  const [addMessage] = useAddMessageMutation();
  const [newMessage, setNewMessage] = useState();
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
        setNewMessage(newMsg);
        setMessages(msgs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-message", (msg) => {
        setReceive({
          isSender: false,
          message: msg,
          senderId: chattingUser._id,
        });
      });
    }
  }, [chattingUser._id]);

  useEffect(() => {
    receive && setMessages((prev) => [...prev, receive]);
  }, [receive]);

  return (
    <div className="flex w-full h-full">
      {chattingUser && (
        <div className="pt-4 w-full flex flex-col">
          <MessageHeader
            chattingUser={chattingUser}
            open={open}
            currentUser={currentUser}
            setPosition={setPosition}
            socket={socket}
          />
          <MessageContainer
            chattingUser={chattingUser}
            currentUser={currentUser}
            messages={messages}
            setMessages={setMessages}
            socket={socket}
            receive={receive}
            newMessage={newMessage}
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
