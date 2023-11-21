import React, { useState } from "react";
import { Drawer, ScrollArea } from "@mantine/core";
import ContactCard from "./ContactCard";
import Logout from "./Logout";

const ContactDrawer = ({
  opened,
  close,
  userContacts,
  handleCurrentChatUser,
  currentUser,
  position,
}) => {
  const [currentSelectedContact, setCurrentSelectedContact] = useState(null);

  const handleChangeCurrentChat = (index, contact) => {
    setCurrentSelectedContact(index);
    handleCurrentChatUser(contact);
  };

  return (
    <Drawer
      opened={opened}
      position={position}
      onClose={close}
      scrollAreaComponent={position === "left" ? ScrollArea.Autosize : null}
      title="Chat App"
      overlayProps={{ opacity: 0.5, blur: 4 }}
    >
      {position === "left" ? (
        <div>
          {currentUser && userContacts.length > 0 && (
            <div className="flex flex-col gap-4">
              {userContacts.map((contact, index) => (
                <ContactCard
                  contact={contact}
                  key={contact._id}
                  index={index}
                  drawerClose={close}
                  showDrawerOnSM={true}
                  handleChangeCurrentChat={handleChangeCurrentChat}
                  currentSelectedContact={currentSelectedContact}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-white flex flex-col mt-2 mx-3 select-none h-full">
          <div className="flex">
            <div className="p-2 border-2 border-light-blue rounded-full flex items-center justify-center my-6">
              <img
                src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                className="w-20 h-20 object-contain"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-4">
            <div className="flex justify-between bg-solid-purple p-4 rounded-md font-semibold">
              <h4>Name</h4>
              <h4 className="capitalize">{currentUser.username}</h4>
            </div>
            <div className="flex justify-between bg-solid-purple p-4 rounded-md font-semibold">
              <h4>Email</h4>
              <h4 className="">{currentUser.email}</h4>
            </div>
          </div>
          <div className=" flex mt-auto absolute bottom-5 right-3">
            <Logout />
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default ContactDrawer;
