import React, { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { datafromContext } from "../store/DataContextProvider";
import ErrorBox from "./ErrorBox";

const Display = () => {
  const { id } = useParams();
  const { AddDetails, prevDetails, names, DelDetails } =
    useContext(datafromContext);

  const date = useRef("");
  const description = useRef("");
  const amount = useRef("");
  const status = useRef("");

  const personTransactions = prevDetails.find(
    (transDetails) => transDetails.id === parseInt(id)
  );

  if (!personTransactions) {
    return <ErrorBox message={"No transactions found for this person."} />;
  }

  const calculateTotalMoney = (personTransactions) => {
    let totalLeased = 0;
    let totalOwed = 0;

    personTransactions.details.forEach((transaction) => {
      if (transaction.type === "Leased") {
        totalLeased += transaction.amount;
      } else if (transaction.type === "Owed") {
        totalOwed += transaction.amount;
      }
    });

    return [totalLeased, totalOwed];
  };

  const handleInput = () => {
    const transactionDate = date.current.value;
    const transactionDesc = description.current.value;
    const transactionAmount = parseInt(amount.current.value);
    const transactionStatus =
      status.current.value.charAt(0).toUpperCase() +
      status.current.value.slice(1);

    if (
      transactionDate &&
      transactionDesc &&
      transactionAmount &&
      transactionStatus
    ) {
      AddDetails(
        personTransactions.id,
        transactionDate,
        transactionDesc,
        transactionAmount,
        transactionStatus
      );

      date.current.value = "";
      description.current.value = "";
      amount.current.value = "";
      status.current.value = "";
    }
  };

  const [totalLeased, totalOwed] = calculateTotalMoney(personTransactions);

  return (
    <>
      <h2 className="col-span-2 h-auto ml-[78px] mt-[20px] p-2 bg-black text-white rounded inline-block">
        Person Name:{" "}
        {names.find((transactions) => transactions.id === parseInt(id)).name}
      </h2>
      <div className="flex flex-col lg:grid grid-cols-2 gap-4 p-4 ">
        <div className="bg-gray-100 p-4 shadow-md">
          <h2 className="font-bold">Money Owed:</h2>
          <p className="text-5xl text-red-600">Rs. {totalOwed}</p>
        </div>
        <div className="bg-gray-100 p-4 shadow-md">
          <h2 className="font-bold">Money Leased:</h2>
          <p className="text-5xl text-green-500">Rs. {totalLeased}</p>
        </div>

        <div className="bg-gray-100 p-4 col-span-2 shadow-md">
          <h1 className="mb-4 font-bold">Transaction Details:</h1>

          <div className="flex flex-col justify-between mt-4 lg:flex-row ">
            <div className="flex flex-col lg:flex-row lg:flex-grow lg:space-x-2">
              <input
                type="date"
                placeholder="Select Date"
                className="border-black border rounded-lg p-2 flex-grow mt-2 mb-2"
                ref={date}
              />
              <input
                type="text"
                placeholder="Description"
                className="border-black border rounded-lg p-2 flex-grow mt-2 mb-2"
                ref={description}
              />
              <input
                type="number"
                placeholder="Amount"
                className="border-black border rounded-lg p-2 flex-grow mt-2 mb-2"
                ref={amount}
              />
              <select
                className="border-black border rounded-lg p-2 flex-grow mt-2 mb-2"
                ref={status}
              >
                <option value="">Select Status</option>
                <option value="leased">Leased</option>
                <option value="owed">Owed</option>
              </select>
              <button
                className="border-2 px-4 py-1 border-black w-20 font-bold bg-[#151062] text-white hover:bg-[#473fb8] transition-colors rounded-full"
                onClick={handleInput}
              >
                ADD
              </button>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border whitespace-nowrap">Status</th>
                  <th className="p-2 border whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {personTransactions.details.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="p-2 border">{transaction.date}</td>
                    <td className="p-2 border">{transaction.desc}</td>
                    <td className="p-2 border">Rs. {transaction.amount}</td>
                    <td className="p-2 border">
                      <p
                        style={{
                          color:
                            transaction.type === "Leased" ? "red" : "green",
                        }}
                      >
                        {transaction.type}
                      </p>
                    </td>
                    <td className="p-2 border whitespace-nowrap">
                      <button
                        onClick={() =>
                          DelDetails(personTransactions.id, transaction.id)
                        }
                        className={`border-2 px-4 py-1 border-black w-24 font-bold transition-colors ${
                          transaction.type === "Leased"
                            ? "bg-red-400 hover:bg-red-500"
                            : "bg-green-400 hover:bg-green-500"
                        }`}
                      >
                        {transaction.type === "Leased" ? "Paid" : "Given"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Display;
