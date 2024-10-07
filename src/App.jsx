import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Display from "./Components/Display";
import DataContextProvider from "./store/DataContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import {
  loadTransactionsFromLocalStorage,
  saveTransactionsToLocalStorage,
} from "./store/data";

const App = () => {
  const [data, setData] = useState({
    transDetails: [],
    transactions: [],
  });

  useEffect(() => {
    const loadedData = loadTransactionsFromLocalStorage();
    setData(loadedData);
  }, []);

  useEffect(() => {
    saveTransactionsToLocalStorage(data);
  }, [data]);

  return (
    <div className="h-[100vh]">
      <Router>
        <DataContextProvider value={data}>
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path="/person/:id" element={<Display />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </DataContextProvider>
      </Router>
    </div>
  );
};

export default App;
