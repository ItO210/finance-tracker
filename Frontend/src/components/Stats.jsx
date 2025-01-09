import React, { useState } from "react";
import * as Bi from "react-icons/bi"; // Import all Bi icons

const Stats = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  // Get all icon keys (icon names) from the Bi object
  const iconNames = Object.keys(Bi);

  // Filter icon names based on the search query
  const filteredIcons = iconNames.filter((iconName) =>
    iconName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIconClick = (icon) => {
    setSelectedIcon(icon); // Set the selected icon in state
    console.log(icon);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search icons..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
        className="mb-4 p-2 border rounded"
      />

      {/* Render list of icons dynamically */}
      <div className="overflow-scroll flex">
        <div className="flex flex-wrap">
          {filteredIcons.length === 0 ? (
            <div>No icons found</div> // Show message when no icons match the search query
          ) : (
            filteredIcons.map((iconName) => {
              const IconComponent = Bi[iconName];

              return (
                <div
                  key={iconName}
                  className="icon-item cursor-pointer m-2 p-2"
                  onClick={() => handleIconClick(IconComponent)}
                >
                  <IconComponent size={40} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
