import { useState } from "react";
import DatePicker from "./DatePicker";
import Select from "./Select";

const TransactionForm = () => {
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (value) => {
    setSelectedValue(value); // Update the selected value
  };

  const [selectedDate, setSelectedDate] = useState(""); // Initialize date state

  // Handle date change
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate); // Update the selected date in parent state
  };

  return (
    <div className="w-full">
      <Select
        id="monthSelect"
        value={selectedValue}
        onChange={handleSelectChange}
        options={months}
        placeholder="Select a month"
      />

      <DatePicker value={selectedDate} onChange={handleDateChange} />
    </div>
  );
};

export default TransactionForm;
