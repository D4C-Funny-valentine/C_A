import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { FaMicrophoneAlt } from "react-icons/fa";
import { BsEmojiSmileFill } from "react-icons/bs";
import "./chat.css";

const ChatInput = ({ sendMessage, socket, chattingUser }) => {
  const [emojiHideShow, setEmojiHideShow] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(null);

  const handleEmojiPickerHideShow = () => {
    setEmojiHideShow(!emojiHideShow);
  };

  const handleEmojiClick = (emoji) => {
    let message = inputMessage;
    message += emoji.emoji;
    setInputMessage(message);
    setEmojiHideShow(false);
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (inputMessage.length > 0) {
      sendMessage(inputMessage);
    }
    setInputMessage("");
  };

  // typing check
  useEffect(() => {
    if (inputMessage.length > 0) {
      if (socket.current) {
        socket.current.on("typing", (data) => {
          setIsTyping(data);
        });
      }
    }
  }, [inputMessage]);

  const inputTypingHandler = (e) => {
    if (e.target.value.length > 0) {
      socket.current.emit("isTyping", { to: chattingUser._id, typing: true });
    } else {
      socket.current.emit("isTyping", { to: chattingUser._id, typing: false });
    }
  };

  return (
    <div className="flex w-full mt-auto flex-col">
      <div className="text-white text-sm">
        {isTyping ? <h3 className="ml-2">typing ...</h3> : null}
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-[5%] flex justify-center items-center relative">
          <button onClick={handleEmojiPickerHideShow}>
            <BsEmojiSmileFill size={20} color="#ffff00c8" />
          </button>
          {emojiHideShow && (
            <div className="absolute -top-96 left-10">
              <EmojiPicker
                theme="black"
                onEmojiClick={(emoji) => handleEmojiClick(emoji)}
                width={300}
                height={350}
                searchPlaceholder={"Search emoji..."}
              />
            </div>
          )}
        </div>
        <form
          onSubmit={sendMessageHandler}
          className="flex w-full justify-between bg-[#ffffff39] rounded-full overflow-hidden"
        >
          <div className="w-full">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
                inputTypingHandler(e);
              }}
              placeholder="Type message here"
              className="outline-none border-0 rounded-none bg-transparent px-3 py-2 text-white break-words whitespace-pre-wrap "
            />
          </div>
          <div className="w-[5%]">
            <button
              type="submit"
              className="bg-solid-purple p-2 w-full h-full rounded-full flex justify-center items-center"
            >
              <IoMdSend size={18} color="white" />
            </button>
          </div>
        </form>
        <div className="w-[5%]">
          <button className="w-full h-full flex justify-center items-center">
            <FaMicrophoneAlt size={20} color="#997af0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
