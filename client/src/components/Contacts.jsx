import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import Logout from "./Logout";
import ContactCard from "./ContactCard";

const Contacts = ({ currentUser, userContacts, handleCurrentChatUser }) => {
  const [currentSelectedContact, setCurrentSelectedContact] = useState(null);

  const handleChangeCurrentChat = (index, contact) => {
    setCurrentSelectedContact(index);
    handleCurrentChatUser(contact);
  };

  return (
    <div
      className={`contacts ${"w-0 sm:w-0 md:w-[40%] lg:w-[28%]"} h-full bg-[#080420] py-2 duration-500 mb-3 overflow-hidden flex flex-col`}
    >
      <div className="flex items-center justify-center my-3 gap-1 mx-2">
        <img src={Logo} className="w-10 h-10 object-contain" alt="" />
        <h3 className="text-xl md:text-xl lg:text-2xl font-bold text-white uppercase">
          AppName
        </h3>
      </div>

      <>
        <div className="overflow-x-hidden overflow-y-scroll">
          {currentUser && userContacts.length > 0 && (
            <div className="flex flex-col gap-4">
              {userContacts.map((contact, index) => (
                <ContactCard
                  contact={contact}
                  index={index}
                  handleChangeCurrentChat={handleChangeCurrentChat}
                  currentSelectedContact={currentSelectedContact}
                />
              ))}
            </div>
          )}
        </div>
      </>

      <div className="bg-[#080420] p-3 flex items-center justify-between mt-auto">
        <div className="flex flex-wrap items-center gap-2">
          <div className="">
            <img
              src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
              alt="avatar"
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="">
            <h3 className="font-bold text-white text-lg capitalize">
              {currentUser.username}
            </h3>
          </div>
        </div>
        <div className="">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
