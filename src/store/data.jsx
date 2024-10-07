export const transDetails = [];

export const transactions = [];

export const saveTransactionsToLocalStorage = (data) => {
  localStorage.setItem("transDetails", JSON.stringify(data.transDetails));
  localStorage.setItem("transactions", JSON.stringify(data.transactions));
};

export const loadTransactionsFromLocalStorage = () => {
  try {
    const storedTransDetails = localStorage.getItem("transDetails");
    const storedTransactions = localStorage.getItem("transactions");

    return {
      transDetails: storedTransDetails ? JSON.parse(storedTransDetails) : [],
      transactions: storedTransactions ? JSON.parse(storedTransactions) : [],
    };
  } catch (error) {
    console.error("Failed to load data from localStorage:", error);
    return { transDetails: [], transactions: [] };
  }
};
