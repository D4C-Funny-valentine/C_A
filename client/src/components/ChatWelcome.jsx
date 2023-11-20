import WelcomeRobot from "../assets/robot.gif";

const ChatWelcome = ({ currentUser, selectedCurrentChatUser }) => {
  return (
    <div className="flex h-full justify-center items-center flex-col w-full">
      <img src={WelcomeRobot} className="w-72 object-contain" alt="Welcome" />
      <div className="text-white font-bold flex flex-col gap-3 justify-center items-center">
        <h3 className="text-3xl">
          Welcome,{" "}
          <span className="text-light-blue capitalize">
            {currentUser.username}
          </span>
        </h3>
        <p className="text-2xl">Please select a chat to Start Messaging.</p>
        <div className="block sm:block md:hidden lg:hidden mt-3">
          <button className="text-white bg-solid-purple hover:bg-light-blue duration-500 px-3 py-2.5 rounded-md font-bold w-full active:scale-95">
            Start Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWelcome;
