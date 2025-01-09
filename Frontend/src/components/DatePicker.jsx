import React, { useState, useRef, useEffect } from "react";

const DatePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef(null);

  // Function to format the date in mm/dd/yyyy format
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero to month
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero to day
    return `${month}/${day}/${year}`;
  };

  // Function to generate all the days for the current month
  const generateCalendarDays = (month, year) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const days = [];

    const firstDay = firstDayOfMonth.getDay(); // Get weekday of the first day
    const prevMonthDaysCount = new Date(year, month, 0).getDate();
    const prevMonthStartDay = prevMonthDaysCount - firstDay + 1;

    // Add previous month's days
    for (let i = prevMonthStartDay; i <= prevMonthDaysCount; i++) {
      days.push(new Date(year, month - 1, i));
    }

    // Add current month's days
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    const totalCells = 42;
    const remainingCells = totalCells - days.length;

    // Fill remaining cells with next month's days
    for (let i = 1; i <= remainingCells; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  // Handle selecting a date
  const handleDateSelect = (selectedDate) => {
    const formattedDate = formatDate(selectedDate);
    onChange(formattedDate); // Notify parent with the selected date
    setIsOpen(false);
  };

  // Handle navigating to the previous month
  const handlePreviousMonth = (event) => {
    event.stopPropagation();
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  // Handle navigating to the next month
  const handleNextMonth = (event) => {
    event.stopPropagation();
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const { month, year } = {
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };

  const days = generateCalendarDays(month, year);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={calendarRef}>
      <div
        id="date"
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-dark-highlight h-full justify-center items-center flex select-none hover:text-dark-highlight"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? value : "Select Date"}
      </div>

      {/* Show the calendar if isOpen is true */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div className="flex justify-between items-center p-2">
            <button
              onClick={handlePreviousMonth}
              className="text-gray-600 hover:text-indigo-600"
            >
              &lt;
            </button>
            <span className="text-lg font-semibold">
              {new Date(year, month).toLocaleString("default", {
                month: "long",
              })}{" "}
              {year}
            </span>
            <button
              onClick={handleNextMonth}
              className="text-gray-600 hover:text-indigo-600"
            >
              &gt;
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-sm text-gray-700">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div key={index} className="flex p-1 justify-center items-start">
                {day}
              </div>
            ))}

            {/* Render days */}
            {days.map((day, index) => (
              <div
                key={index}
                onClick={() => handleDateSelect(day)} // Select a date
                className={`p-2 flex items-center justify-center rounded-lg cursor-pointer hover:bg-indigo-100 ${
                  day.toDateString() === new Date(value).toDateString()
                    ? "bg-red-500 text-white"
                    : ""
                } ${
                  day.getMonth() !== month ? "text-gray-400" : "text-gray-700"
                }`}
              >
                {day.getDate()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
