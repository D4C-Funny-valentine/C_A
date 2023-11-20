import React from "react";

const ContactCard = ({
  contact,
  index,
  handleChangeCurrentChat,
  drawerClose,
  currentSelectedContact,
}) => {
  return (
    <div
      className={`${
        index === currentSelectedContact ? "bg-solid-purple" : "bg-[#ffffff39]"
      } px-2 py-3 rounded-md flex items-center gap-4 mx-2 cursor-pointer duration-300`}
      key={contact._id}
      onClick={() => {
        handleChangeCurrentChat(index, contact);
        drawerClose();
      }}
    >
      <div className="">
        <img
          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
          alt="avatar"
          className="w-10 h-10 object-contain"
        />
      </div>
      <div className="">
        <h3 className="text-white font-semibold capitalize">
          {contact.username}
        </h3>
      </div>
    </div>
  );
};

export default ContactCard;
