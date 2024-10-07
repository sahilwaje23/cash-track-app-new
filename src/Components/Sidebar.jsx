import React, { useContext, useState, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { datafromContext } from "../store/DataContextProvider";
import { Link } from "react-router-dom";
import delimg from "../../public/delimg.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { names, AddFriend, DeleteFriend } = useContext(datafromContext);
  const inputRef = useRef();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAddFriend = () => {
    const name = inputRef.current.value;
    if (name) {
      AddFriend(name);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="h-auto absolute">
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        className={`mt-4 h-[48px] absolute left-4 hover:text-white p-2 rounded hover:bg-gray-800 transition duration-200 ease-in-out z-20 ${
          isOpen ? "bg-gray-800 text-white" : ""
        }`}
      >
        <RxHamburgerMenu size={32} />
      </button>

      <div
        className={`absolute bg-opacity-80 bg-gradient-to-r from-gray-800 to-blue-950 text-white w-64 p-4 transition-transform duration-300 min-h-screen h-auto z-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <hr className="mb-4 mt-16" />
        <h2 className="text-xl font-bold mb-4">Add People:</h2>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            className="border border-black text-black"
            placeholder="Add a person..."
            ref={inputRef}
          />
          <button
            className="border border-black bg-black text-white p-2"
            onClick={handleAddFriend}
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {names.map((n) => (
            <Link
              to={`person/${n.id}`}
              onClick={() => setIsOpen(false)}
              key={n.id}
            >
              <li className="flex justify-between py-2 px-4 rounded hover:bg-white hover:text-blue-950 transition">
                {n.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the Link from triggering
                    DeleteFriend(n.id);
                  }}
                >
                  <img src={delimg} className="w-8" alt="delete" />
                </button>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
