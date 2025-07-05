import React, { useState } from "react";
import { Plus } from "lucide-react";

const SpreadsheetBottomNav = () => {
  const [activeTab, setActiveTab] = useState("All Orders");

  const tabs = [
    { id: "all-orders", label: "All Orders", value: "All Orders" },
    { id: "pending", label: "Pending", value: "Pending" },
    { id: "reviewed", label: "Reviewed", value: "Reviewed" },
    { id: "arrived", label: "Arrived", value: "Arrived" },
  ];

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
    console.log(`Tab clicked: ${tabValue}`);
  };

  const handleAddClick = () => {
    console.log("Add button clicked");
  };

  return (
    // Spreadsheet Navigation bar at the bottom
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50">
      <div className="flex items-center px-4 h-12 space-x-4 text-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.value)}
            className={`relative pb-2 transition-all cursor-pointer ${
              activeTab === tab.value
                ? "text-green-900 font-semibold border-b-2 border-green-700 bg-green-100 px-2"
                : "text-gray-700 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}

        {/* Plus button for add the new file */}
        <button
          onClick={handleAddClick}
          className="text-gray-500 hover:text-black cursor-pointer"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SpreadsheetBottomNav;
