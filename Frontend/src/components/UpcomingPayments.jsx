import { useState, useEffect } from "react";

const UpcomingPayments = () => {
  const [upcomingPayments, setUpcomingPayments] = useState([]);

  useEffect(() => {
    const fetchUpcomingPayments = async () => {
      try {
        const response = await fetch("http://localhost:3000/upcomingPayments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUpcomingPayments(data.upcomingPayments); // Extract the cards array from the response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUpcomingPayments();
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
      <h1 className="w-full p-2 text-center">Upcoming Payments</h1>
      <ul className="flex w-full overflow-scroll p-2">
        {upcomingPayments.map((item) => (
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

export default UpcomingPayments;
