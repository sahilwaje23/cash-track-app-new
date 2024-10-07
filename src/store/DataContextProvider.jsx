import { createContext, useContext, useState, useEffect } from "react";
import React from "react";

const saveTransactionsToLocalStorage = (data) => {
  localStorage.setItem("transactionsData", JSON.stringify(data));
};

const loadTransactionsFromLocalStorage = () => {
  const storedData = localStorage.getItem("transactionsData");
  return storedData ? JSON.parse(storedData) : null;
};

const defaultTransDetails = [];
const defaultTransactions = [];

export const datafromContext = createContext();

const DataContextProvider = ({ children }) => {
  const storedData = loadTransactionsFromLocalStorage();
  const { transactions = [], transDetails = [] } = storedData || {};

  const [names, setNames] = useState(
    transactions.length > 0 ? transactions : defaultTransactions
  );
  const [prevDetails, setDetail] = useState(
    transDetails.length > 0 ? transDetails : defaultTransDetails
  );

  useEffect(() => {
    saveTransactionsToLocalStorage({
      transDetails: prevDetails,
      transactions: names,
    });
  }, [names, prevDetails]);

  const AddDetails = (id, date, desc, amount, type) => {
    setDetail((prevDetails) => {
      return prevDetails.map((detail) => {
        if (detail.id === id) {
          return {
            ...detail,
            details: [
              ...detail.details,
              {
                id: Math.floor(Math.random() * 10000),
                date,
                desc,
                amount,
                type,
              },
            ],
          };
        }
        return detail;
      });
    });
  };

  const DelDetails = (id, transactionId) => {
    setDetail((prevDetails) => {
      return prevDetails.map((detail) => {
        if (detail.id === id) {
          return {
            ...detail,
            details: detail.details.filter(
              (transaction) => transaction.id !== transactionId
            ),
          };
        }
        return detail;
      });
    });
  };

  const AddFriend = (name) => {
    const newId = Math.floor(Math.random() * 10000);
    setNames((prevNames) => [...prevNames, { id: newId, name }]);
    setDetail((prevDetails) => [...prevDetails, { id: newId, details: [] }]);
  };

  const DeleteFriend = (id) => {
    setNames((names) => names.filter((name) => name.id !== id));
    setDetail((prevDetails) =>
      prevDetails.filter((detail) => detail.id !== id)
    );
  };

  return (
    <datafromContext.Provider
      value={{
        names,
        AddFriend,
        AddDetails,
        prevDetails,
        DelDetails,
        DeleteFriend,
      }}
    >
      {children}
    </datafromContext.Provider>
  );
};

export default DataContextProvider;
