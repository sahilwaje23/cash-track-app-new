import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import error from "../../public/error.png";

const ErrorBox = ({ message }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const handleRedirect = () => {
    setIsVisible(false);
    navigate("/");
  };

  if (!isVisible) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs p-5 bg-red-600 bg-opacity-80 text-white text-center rounded-md shadow-lg">
      <img src={error} alt="error icon" className="w-8 h-8 mb-3 mx-auto" />
      <p>{message}</p>
      <button
        className="mt-3 px-4 py-2 bg-white text-red-600 rounded-sm hover:bg-gray-200 transition-colors"
        onClick={handleRedirect}
      >
        Ok
      </button>
    </div>
  );
};

export default ErrorBox;
