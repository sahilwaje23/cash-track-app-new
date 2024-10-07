import React from "react";
import Logo from "../../public/Logo.png";
import image from "../../public/image.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-gray-800 to-blue-950 p-4 flex items-center justify-between shadow-lg w-full z-1 ">
      <img
        src={Logo}
        className="w-auto h-12 sm:h-14 lg:h-16 cursor-pointer"
        alt="Logo"
        style={{ filter: "invert(1)" }}
        draggable="false"
        onClick={() => navigate("/")}
      />

      <img
        src={image}
        className="w-auto h-8 sm:h-10 lg:h-12"
        alt="Additional Logo"
        style={{ filter: "invert(1)" }}
        draggable="false"
      />
    </div>
  );
};

export default Navbar;
