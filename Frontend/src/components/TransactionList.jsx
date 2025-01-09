import { useState, useEffect } from "react";

const TransactionList = (limit) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:3000/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(limit),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTransactions(data.transactions); // Extract the cards array from the response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Adds leading zero
    const day = String(dateObj.getDate()).padStart(2, "0"); // Adds leading zero

    return `${month}/${day}/${year}`;
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <h1 className="w-full p-2 text-center">Recent Transactions</h1>
      <ul className="text-dark-txt w-full overflow-scroll p-2">
        {transactions.map((item) => (
          <li
            className="flex border rounded p-10 hover:bg-dark-selected hover:text-dark-highlight items-center justify-between"
            key={item._id}
          >
            <p>{item.description}</p>
            <p>{formatDate(item.date || item.startDate)}</p>
            <p>{item.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
