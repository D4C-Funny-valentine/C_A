import { useEffect, useState } from "react";
import WelcomeRobot from "../assets/robot.gif";
import ContactCard from "./ContactCard";
import Logo from "../assets/logo.svg";
import { FaBars } from "react-icons/fa";

const ChatWelcome = ({
  currentUser,
  userContacts,
  setPosition,
  open,
  handleCurrentChatUser,
}) => {
  const [currentSelectedContact, setCurrentSelectedContact] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const showWelcomeRobotTimeOut = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => {
      clearTimeout(showWelcomeRobotTimeOut);
    };
  }, []);

  const handleChangeCurrentChat = (index, contact) => {
    setCurrentSelectedContact(index);
    handleCurrentChatUser(contact);
  };
  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        {showWelcome ? (
          <div className="flex h-full justify-center items-center flex-col w-full">
            <img
              src={WelcomeRobot}
              className="w-72 object-contain"
              alt="Welcome"
            />
            <div className="text-white font-bold flex flex-col gap-3 justify-center items-center">
              <h3 className="text-3xl">
                Welcome,{" "}
                <span className="text-light-blue capitalize">
                  {currentUser.username}
                </span>
              </h3>
              <p className="text-2xl text-center">
                Please select a chat to Start Messaging.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full block sm:block md:hidden lg:hidden">
              <div className="flex justify-between mx-4 items-center">
                <div className="flex items-center justify-center my-3 gap-1 mx-2">
                  <img src={Logo} className="w-10 h-10 object-contain" alt="" />
                  <h3 className="text-xl md:text-xl lg:text-2xl font-bold text-white uppercase">
                    AppName
                  </h3>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setPosition("right");
                    open();
                  }}
                >
                  <FaBars size={23} color="white" />
                </div>
              </div>
              <div className="">
                {currentUser && userContacts.length > 0 && (
                  <div className="flex flex-col gap-4">
                    {userContacts.map((contact, index) => (
                      <ContactCard
                        key={index}
                        contact={contact}
                        index={index}
                        handleChangeCurrentChat={handleChangeCurrentChat}
                        currentSelectedContact={currentSelectedContact}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="hidden sm:hidden md:block lg:block w-full h-full">
              <div className="flex h-full justify-center items-center flex-col w-full">
                <img
                  src={WelcomeRobot}
                  className="w-72 object-contain"
                  alt="Welcome"
                />
                <div className="text-white font-bold flex flex-col gap-3 justify-center items-center">
                  <h3 className="text-3xl">
                    Welcome,{" "}
                    <span className="text-light-blue capitalize">
                      {currentUser.username}
                    </span>
                  </h3>
                  <p className="text-2xl text-center">
                    Please select a chat to Start Messaging.
                  </p>
                  <div className="block sm:block md:hidden lg:hidden mt-3">
                    <button className="text-white bg-solid-purple hover:bg-light-blue duration-500 px-3 py-2.5 rounded-md font-bold w-full active:scale-95">
                      Start Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWelcome;
