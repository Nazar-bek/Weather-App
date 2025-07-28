import React, { useState } from "react";

const tabItems = ["Current Weather", "Forecast", "Statistics"];

const Tabs = ({ onTabChange }) => {
  const [active, setActive] = useState(0);

  const handleClick = (index) => {
    setActive(index);
    onTabChange(tabItems[index]);
  };

  return (
    <div className="flex justify-between bg-white p-2  shadow-d dark:bg-[#2b2d30]">
      {tabItems.map((tab, index) => (
        <button
          key={tab}
          className={`px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition ${
            active === index
              ? "bg-[#0d6efd] text-white"
              : "bg-transparent text-[#212529] dark:text-white hover:bg-[#0d6efd]/10"
          }`}
          onClick={() => handleClick(index)}
        >
          {tab} 
        </button>
      ))}
    </div>
  );
};

export default Tabs;
