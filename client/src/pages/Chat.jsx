import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersMutation } from "../redux/services/userApi";
import Contacts from "../components/Contacts";
import Loader from "../components/Loader";
import "./page.css";
import ChatWelcome from "../components/ChatWelcome";
import ChatContainer from "../components/ChatContainer";
import io from "socket.io-client";

const host = "http://localhost:5500";

const Chat = () => {
  const socket = useRef();
  const storeUser = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState(
    storeUser ? JSON.parse(storeUser) : null
  );
  const [selectedCurrentChatUser, setSelectedCurrentChatUser] = useState(null);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const [getAllUsers] = useGetAllUsersMutation();

  useEffect(() => {
    if (currentUser) {
      socket.current = io.connect(host);
      socket.current.emit("sendUser", currentUser._id);
    }
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    try {
      const fetchAllUserExceptYou = async () => {
        if (!currentUser) return;

        if (currentUser.isAvatarImageSet) {
          const { data, error } = await getAllUsers(currentUser._id);

          if (data?.success) {
            setUsers(data.users);
          } else {
            return console.log(error);
          }
        } else {
          return navigate("/login");
        }
      };
      fetchAllUserExceptYou();
    } catch (error) {
      console.log(error);
    }
  }, [currentUser]);

  const handleCurrentChatUser = (contact) => {
    setSelectedCurrentChatUser(contact);
  };

  if (users.length === 0) {
    return <Loader />;
  }
  return (
    <div className="h-screen bg-dark-blue flex justify-center items-center">
      <div className="flex w-full h-full sm:w-full sm:h-full md:w-[95%] md:h-[95%] lg:w-[85%] lg:h-[85%] bg-dark-blue sm:bg-black/70 md:bg-black/70 lg:bg-black/70 rounded-md">
        <Contacts
          currentUser={currentUser}
          userContacts={users}
          handleCurrentChatUser={handleCurrentChatUser}
        />
        {!selectedCurrentChatUser ? (
          <ChatWelcome
            currentUser={currentUser}
            selectedCurrentChatUser={selectedCurrentChatUser}
          />
        ) : (
          <ChatContainer
            currentUser={currentUser}
            chattingUser={selectedCurrentChatUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
