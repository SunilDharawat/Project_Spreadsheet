import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { MoreVertical, Plus, ChevronDown, Ellipsis, Edit3 } from "lucide-react";

const columnHelper = createColumnHelper();

// Modern editable cell component with enhanced logging and comments
const ModernEditableCell = ({ info, type = "text", className = "" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(info.getValue() || "");
  const [isHovered, setIsHovered] = useState(false);

  // Handle cell click to enter edit mode
  const handleClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    console.log(
      `[CELL EDIT] Started editing - Column: ${info.column.id}, Row: ${
        info.row.index + 1
      }, Current Value: "${value}"`
    );
  };

  // Handle blur event to exit edit mode and save changes
  const handleBlur = () => {
    setIsEditing(false);
    console.log(
      `[CELL SAVE] Saved changes - Column: ${info.column.id}, Row: ${
        info.row.index + 1
      }, New Value: "${value}"`
    );

    // Additional logging for data tracking
    console.log(`[DATA LOG] ${info.column.id}:`, value);
  };

  // Handle keyboard navigation in edit mode
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      console.log(
        `[KEYBOARD] Enter pressed - Saving cell ${info.column.id} in row ${
          info.row.index + 1
        }`
      );
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue(info.getValue() || ""); // Reset to original value
      console.log(
        `[KEYBOARD] Escape pressed - Canceling edit for cell ${
          info.column.id
        } in row ${info.row.index + 1}`
      );
    }
  };

  // Handle value changes during editing
  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(
      `[CELL CHANGE] Typing in ${info.column.id} - Current input: "${e.target.value}"`
    );
  };

  // CSS classes for different states
  const baseClasses =
    "w-full h-full px-3 py-2 text-sm transition-all duration-200 cursor-text";
  const displayClasses = `${baseClasses} hover:bg-gray-50 rounded-md group-hover:shadow-sm ${className}`;
  const editClasses = `${baseClasses} bg-white border-2 border-blue-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`;

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => {
        setIsHovered(true);
        console.log(
          `[HOVER] Mouse entered cell ${info.column.id} in row ${
            info.row.index + 1
          }`
        );
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        console.log(
          `[HOVER] Mouse left cell ${info.column.id} in row ${
            info.row.index + 1
          }`
        );
      }}
    >
      {isEditing ? (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={editClasses}
          autoFocus
          placeholder={`Enter ${info.column.id}...`}
        />
      ) : (
        <div onClick={handleClick} className={displayClasses}>
          <div className="flex items-center justify-between">
            <span className={value ? "text-gray-900" : "text-gray-400"}>
              {value}
            </span>
            {isHovered && (
              <Edit3 className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Modern status cell with consistent styling and proper z-index handling
const ModernStatusCell = ({ info }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(info.getValue() || "");

  const statusOptions = [
    {
      value: "Complete",
      color: "bg-green-100 text-green-700 border-green-200",
    },
    {
      value: "In-process",
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
    {
      value: "Need to start",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    { value: "Blocked", color: "bg-red-100 text-red-700 border-red-200" },
  ];

  const currentStatus = statusOptions.find((s) => s.value === value) || {
    value: "",
    color: "bg-gray-100 text-gray-500 border-gray-200",
  };

  const handleSelect = (selectedValue) => {
    setValue(selectedValue);
    setIsOpen(false);
    console.log(
      `[STATUS UPDATE] Column: ${info.column.id}, Row: ${
        info.row.index + 1
      }, New Value: ${selectedValue}`
    );
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    console.log(
      `[STATUS DROPDOWN] ${isOpen ? "Closed" : "Opened"} for row ${
        info.row.index + 1
      }`
    );
  };

  return (
    <div className="relative w-full">
      <div
        onClick={handleClick}
        className="w-full px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
      >
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${currentStatus.color}`}
        >
          {value || "Select status..."}
        </span>
      </div>

      {/* Dropdown with proper z-index and positioning */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-48 bg-white border border-gray-200 rounded-md shadow-lg mt-1 left-0">
            {statusOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer first:rounded-t-md last:rounded-b-md"
              >
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${option.color}`}
                >
                  {option.value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Modern priority cell with proper z-index and state management
const ModernPriorityCell = ({ info }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(info.getValue() || "");

  const priorityOptions = [
    { value: "High", color: "text-red-600", bg: "bg-red-50" },
    { value: "Medium", color: "text-yellow-600", bg: "bg-yellow-50" },
    { value: "Low", color: "text-blue-600", bg: "bg-blue-50" },
  ];

  const currentPriority = priorityOptions.find((p) => p.value === value) || {
    value: "",
    color: "text-gray-500",
    bg: "bg-gray-50",
  };

  const handleSelect = (selectedValue) => {
    setValue(selectedValue);
    setIsOpen(false);
    console.log(
      `[PRIORITY UPDATE] Column: ${info.column.id}, Row: ${
        info.row.index + 1
      }, New Value: ${selectedValue}`
    );
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    console.log(
      `[PRIORITY DROPDOWN] ${isOpen ? "Closed" : "Opened"} for row ${
        info.row.index + 1
      }`
    );
  };

  return (
    <div className="relative w-full">
      <div
        onClick={handleClick}
        className="w-full px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
      >
        <span className={`font-medium ${currentPriority.color}`}>
          {value || "Select priority..."}
        </span>
      </div>

      {/* Dropdown with proper z-index and positioning */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-40 bg-white border border-gray-200 rounded-md shadow-lg mt-1 left-0">
            {priorityOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-3 py-2 hover:${option.bg} cursor-pointer ${option.color} font-medium first:rounded-t-md last:rounded-b-md transition-colors`}
              >
                {option.value}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Modern URL cell with enhanced validation and logging
const ModernURLCell = ({ info }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(info.getValue() || "");
  const [isHovered, setIsHovered] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);

  // URL validation function
  const validateUrl = (url) => {
    if (!url) return true; // Empty is valid
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    console.log(
      `[URL EDIT] Started editing URL - Column: ${info.column.id}, Row: ${
        info.row.index + 1
      }, Current URL: "${value}"`
    );
  };

  const handleBlur = () => {
    setIsEditing(false);
    const isValid = validateUrl(value);
    setIsValidUrl(isValid);

    if (isValid) {
      console.log(
        `[URL SAVE] Valid URL saved - Column: ${info.column.id}, Row: ${
          info.row.index + 1
        }, URL: "${value}"`
      );
    } else {
      console.warn(
        `[URL WARNING] Invalid URL format - Column: ${info.column.id}, Row: ${
          info.row.index + 1
        }, URL: "${value}"`
      );
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    const isValid = validateUrl(e.target.value);
    setIsValidUrl(isValid);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      console.log(
        `[URL KEYBOARD] Enter pressed - Saving URL ${info.column.id} in row ${
          info.row.index + 1
        }`
      );
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue(info.getValue() || "");
      setIsValidUrl(true);
      console.log(
        `[URL KEYBOARD] Escape pressed - Canceling URL edit for ${
          info.column.id
        } in row ${info.row.index + 1}`
      );
    }
  };

  const baseClasses =
    "w-full h-full px-3 py-2 text-sm transition-all duration-200 cursor-text";
  const displayClasses = `${baseClasses} hover:bg-gray-50 rounded-md group-hover:shadow-sm text-blue-600 hover:text-blue-800`;
  const editClasses = `${baseClasses} bg-white border-2 ${
    isValidUrl ? "border-blue-400" : "border-red-400"
  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-600`;

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditing ? (
        <input
          type="url"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={editClasses}
          autoFocus
          placeholder="Enter URL..."
        />
      ) : (
        <div onClick={handleClick} className={displayClasses}>
          <div className="flex items-center justify-between">
            <span
              className={
                value
                  ? isValidUrl
                    ? "text-blue-600"
                    : "text-red-600"
                  : "text-gray-400"
              }
            >
              {value}
            </span>
            {isHovered && (
              <Edit3 className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Dummy Data for spreadsheet
const initialData = [
  {
    sno: 1,
    jobRequest: "Launch social media campaign for product",
    submitted: "15-11-2024",
    status: "In-process",
    submitter: "Aisha Patel",
    url: "www.aishapatel.com",
    assigned: "Sophie Choudhury",
    priority: "Medium",
    dueDate: "20-11-2024",
    estValue: "6,200,000 ₹",
  },
  {
    sno: 2,
    jobRequest: "Update press kit for company redesign",
    submitted: "28-10-2024",
    status: "Need to start",
    submitter: "Irfan Khan",
    url: "www.irfankhanp.com",
    assigned: "Tejas Pandey",
    priority: "High",
    dueDate: "30-10-2024",
    estValue: "3,500,000 ₹",
  },
  {
    sno: 3,
    jobRequest: "Finalize user testing feedback for app",
    submitted: "05-12-2024",
    status: "In-process",
    submitter: "Mark Johnson",
    url: "www.markjohnson.com",
    assigned: "Rachel Lee",
    priority: "Medium",
    dueDate: "10-12-2024",
    estValue: "4,750,000 ₹",
  },
  {
    sno: 4,
    jobRequest: "Design new features for the website",
    submitted: "10-01-2025",
    status: "Complete",
    submitter: "Emily Green",
    url: "www.emilygreen.com",
    assigned: "Tom Wright",
    priority: "Low",
    dueDate: "15-01-2025",
    estValue: "5,900,000 ₹",
  },
  {
    sno: 5,
    jobRequest: "Prepare financial report for Q4",
    submitted: "25-01-2025",
    status: "Blocked",
    submitter: "Jessica Brown",
    url: "www.jessicabrown.com",
    assigned: "Kevin Smith",
    priority: "Low",
    dueDate: "30-01-2025",
    estValue: "2,800,000 ₹",
  },
];

const data = [
  ...initialData,
  ...Array.from({ length: 15 }, (_, i) => ({
    sno: 6 + i,
    jobRequest: "",
    submitted: "",
    status: "",
    submitter: "",
    url: "",
    assigned: "",
    priority: "",
    dueDate: "",
    estValue: "",
  })),
];

export default function ModernSpreadsheet() {
  const [selectedColumn, setSelectedColumn] = useState(null);

  // Handle column selection with enhanced logging
  const handleColumnClick = (columnId) => {
    const previousColumn = selectedColumn;
    const newColumn = columnId === selectedColumn ? null : columnId;
    setSelectedColumn(newColumn);

    console.log(
      `[COLUMN SELECTION] Previous: ${previousColumn || "None"}, New: ${
        newColumn || "None"
      }`
    );

    if (newColumn) {
      console.log(`[COLUMN HIGHLIGHT] Column "${newColumn}" is now selected`);
    } else {
      console.log(`[COLUMN HIGHLIGHT] Column selection cleared`);
    }
  };

  // Enhanced column definitions with better organization
  const columns = [
    {
      id: "q3-overview",
      header: () => (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 px-4 py-2 font-semibold text-sm flex items-center gap-2 rounded-t-lg">
          <span className="text-blue-700">↺</span>
          Q3 Financial Overview
          <ChevronDown className="h-4 w-4 text-blue-600" />
        </div>
      ),
      columns: [
        columnHelper.accessor("sno", {
          header: "#",
          size: 60,
          cell: (info) => (
            <div className="w-full text-center text-sm font-medium text-gray-600 px-3 py-2">
              {info.getValue()}
            </div>
          ),
        }),
        columnHelper.accessor("jobRequest", {
          header: () => (
            <div className="flex items-center gap-2 font-medium text-gray-700">
              📄 Job Request <ChevronDown className="h-3 w-3 text-gray-500" />
            </div>
          ),
          size: 300,
          cell: (info) => <ModernEditableCell info={info} />,
        }),
        columnHelper.accessor("submitted", {
          header: () => (
            <div className="flex items-center gap-2 font-medium text-gray-700">
              📅 Submitted <ChevronDown className="h-3 w-3 text-gray-500" />
            </div>
          ),
          size: 130,
          cell: (info) => <ModernEditableCell info={info} type="date" />,
        }),
        columnHelper.accessor("status", {
          header: () => (
            <div className="flex items-center gap-2 font-medium text-gray-700">
              🔄 Status <ChevronDown className="h-3 w-3 text-gray-500" />
            </div>
          ),
          size: 140,
          cell: (info) => <ModernStatusCell info={info} />,
        }),
        columnHelper.accessor("submitter", {
          header: () => (
            <div className="flex items-center gap-2 font-medium text-gray-700">
              👤 Submitter <ChevronDown className="h-3 w-3 text-gray-500" />
            </div>
          ),
          size: 150,
          cell: (info) => <ModernEditableCell info={info} />,
        }),
        columnHelper.accessor("url", {
          header: () => (
            <div className="flex items-center gap-2 font-medium text-gray-700">
              🔗 URL <ChevronDown className="h-3 w-3 text-gray-500" />
            </div>
          ),
          size: 200,
          cell: (info) => <ModernURLCell info={info} />,
        }),
      ],
    },
    {
      id: "abc-group",
      header: () => (
        <div className="bg-gradient-to-r from-green-50 to-green-100 text-green-800 px-4 py-2 font-semibold text-sm flex items-center gap-2 rounded-t-lg">
          △ ABC <Ellipsis className="h-4 w-4 text-green-600" />
        </div>
      ),
      columns: [
        columnHelper.accessor("assigned", {
          header: () => (
            <div className="flex items-center gap-2 font-medium text-gray-700">
              👥 Assigned <ChevronDown className="h-3 w-3 text-gray-500" />
            </div>
          ),
          size: 150,
          cell: (info) => <ModernEditableCell info={info} />,
        }),
      ],
    },
    {
      id: "answer-group",
      header: () => (
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 px-4 py-2 font-semibold text-sm flex items-center gap-2 rounded-t-lg">
          Answer a question <Ellipsis className="h-4 w-4 text-purple-600" />
        </div>
      ),
      columns: [
        columnHelper.accessor("priority", {
          header: () => (
            <div className="flex items-center gap-2 font-medium text-gray-700">
              Priority
            </div>
          ),
          size: 120,
          cell: (info) => <ModernPriorityCell info={info} />,
        }),
        columnHelper.accessor("dueDate", {
          header: () => (
            <div className="flex items-center gap-2 font-medium text-gray-700">
              Due Date
            </div>
          ),
          size: 130,
          cell: (info) => <ModernEditableCell info={info} type="date" />,
        }),
      ],
    },
    {
      id: "extract-group",
      header: () => (
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 px-4 py-2 font-semibold text-sm flex items-center gap-2 rounded-t-lg">
          Extract <Ellipsis className="h-4 w-4 text-orange-600" />
        </div>
      ),
      columns: [
        columnHelper.accessor("estValue", {
          header: () => (
            <div className="flex items-center gap-2 font-medium text-gray-700">
              Est. Value
            </div>
          ),
          size: 130,
          cell: (info) => <ModernEditableCell info={info} />,
        }),
      ],
    },
    {
      id: "plus-group",
      header: () => (
        <div className="flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-2 font-semibold text-sm rounded-t-lg">
          <Plus className="h-4 w-4 text-gray-600" />
        </div>
      ),
      columns: [
        {
          id: "plus-action",
          header: () => <div className="w-full h-full" />,
          size: 60,
          cell: () => <div className="w-full h-full" />,
        },
      ],
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-gray-50 mb-10">
      {/* Main spreadsheet container with enhanced styling */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table component */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-gray-200">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="text-left text-sm font-medium text-gray-900 bg-gray-50 px-2 py-3 cursor-pointer hover:bg-gray-100 transition-colors relative"
                      style={{ width: `${header.getSize()}px` }}
                      onClick={() => handleColumnClick(header.id)}
                    >
                      {/* Column selection indicator */}
                      {selectedColumn === header.id && (
                        <div className="absolute inset-0 bg-blue-100 opacity-20 pointer-events-none" />
                      )}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`group border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index < 5 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`text-sm text-gray-900 transition-colors relative ${
                        selectedColumn === cell.column.id ? "bg-blue-50" : ""
                      }`}
                      style={{ width: `${cell.column.getSize()}px` }}
                    >
                      {/* Column selection indicator for cells */}
                      {selectedColumn === cell.column.id && (
                        <div className="absolute left-0 top-0 w-1 h-full bg-blue-400" />
                      )}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
