import React from "react";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { GiBroadsword } from "react-icons/gi";
import Logo from "../../public/Logo.png";

const Homepage = () => {
  return (
    <div className="h-auto bg-gray-100 flex flex-col items-center  p-6">
      <h1 className="mb-4">
        <img
          src={Logo}
          className="w-auto h-16 sm:h-28 lg:h-32"
          alt="Logo"
          draggable="false"
        />
      </h1>
      <h1 className="text-center text-gray-700 mb-10 text-lg">
        Manage your transactions and finances with ease.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 flex flex-col justify-between h-60">
          <FaUsers className="text-blue-600 mb-4 text-4xl mx-auto" />
          <h2 className="text-xl font-semibold mb-2">Add People</h2>
          <p className="text-gray-600 mb-4">
            Track your financial interactions effortlessly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 flex flex-col justify-between h-60">
          <FaMoneyBillWave className="text-green-500 mb-4 text-4xl mx-auto" />
          <h2 className="text-xl font-semibold mb-2">View Transactions</h2>
          <p className="text-gray-600 mb-4">
            See your past transactions easily.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 flex flex-col justify-between h-60">
          <GiBroadsword className="text-red-500 mb-4 text-4xl mx-auto" />
          <h2 className="text-xl font-semibold mb-2">Avoid Fights & Blood</h2>
          <p className="text-gray-600 mb-4">Keep Track , Avoid Fights.</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
