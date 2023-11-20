import React from "react";
import LoaderAnimation from "../assets/LoaderAnimation.json";
import Lottie from "lottie-react";

const Loader = () => {
  return (
    <div className="h-screen bg-dark-blue flex justify-center items-center">
      <div className="flex justify-center items-center w-3/4 h-3/4 sm:w-3/4 sm:h-3/4 md:w-2/4 md:h-2/4 lg:w-2/4 lg:h-2/4">
        <Lottie animationData={LoaderAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
