import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { MoreVertical, Plus, ChevronDown, Ellipsis } from "lucide-react";

const columnHelper = createColumnHelper();

const statusCell = (info) => {
  const value = info.getValue();
  const colors = {
    Complete: "bg-green-100 text-green-700 border-green-200",
    "In-process": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Need to start": "bg-blue-100 text-blue-700 border-blue-200",
    Blocked: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold border ${
        colors[value] || "text-gray-400"
      }`}
    >
      {value}
    </span>
  );
};

const priorityCell = (info) => {
  const value = info.getValue();
  const colors = {
    High: "text-red-600 font-semibold",
    Medium: "text-yellow-600 font-semibold",
    Low: "text-blue-600 font-semibold",
  };
  return <span className={`${colors[value] || "text-gray-400"}`}>{value}</span>;
};

const editableCell = () => ({
  cell: (info) => (
    <input
      type="text"
      defaultValue={info.getValue() || ""}
      className="w-full px-2 py-1 text-sm bg-transparent outline-none focus:bg-blue-50 focus:ring-1 focus:ring-blue-200"
    />
  ),
});

const urlCell = (info) => (
  <input
    type="text"
    defaultValue={info.getValue() || ""}
    className="w-full px-2 py-1 text-sm text-blue-600 underline bg-transparent outline-none focus:bg-blue-50 focus:ring-1 focus:ring-blue-200"
  />
);

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

export default function JobTableUI() {
  const [selectedColumn, setSelectedColumn] = useState(null);

  const handleColumnClick = (columnId) => {
    setSelectedColumn(columnId === selectedColumn ? null : columnId);
  };

  const columns = [
    {
      id: "q3-overview",
      header: () => (
        <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
          <span className="text-blue-500">↺</span>
          Q3 Financial Overview
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      ),
      columns: [
        columnHelper.accessor("sno", {
          header: "#",
          size: 40,
          cell: (info) => (
            <div className="w-full text-center text-xs text-gray-500">
              {info.getValue()}
            </div>
          ),
        }),
        columnHelper.accessor("jobRequest", {
          header: () => (
            <div className="flex items-center gap-1 font-medium">
              📄 Job Request <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
          ),
          size: 300,
          ...editableCell(),
        }),
        columnHelper.accessor("submitted", {
          header: () => (
            <div className="flex items-center gap-1">
              📅 Submitted <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
          ),
          size: 120,
          ...editableCell(),
        }),
        columnHelper.accessor("status", {
          header: () => (
            <div className="flex items-center gap-1">
              🔄 Status <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
          ),
          size: 120,
          cell: statusCell,
        }),
        columnHelper.accessor("submitter", {
          header: () => (
            <div className="flex items-center gap-1">
              👤 Submitter <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
          ),
          size: 140,
          ...editableCell(),
        }),
        columnHelper.accessor("url", {
          header: () => (
            <div className="flex items-center gap-1">
              🔗 URL <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
          ),
          size: 180,
          cell: urlCell,
        }),
      ],
    },
    {
      id: "abc-group",
      header: () => (
        <div className="bg-green-100 text-green-700 px-3 py-1 font-medium text-sm flex items-center gap-2">
          △ ABC <Ellipsis className="h-4 w-4 text-gray-400" />
        </div>
      ),
      columns: [
        columnHelper.accessor("assigned", {
          header: () => (
            <div className="flex items-center gap-1">
              👥 Assigned <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
          ),
          size: 140,
          ...editableCell(),
        }),
      ],
    },
    {
      id: "answer-group",
      header: () => (
        <div className="bg-purple-100 text-purple-800 px-3 py-1 font-medium text-sm flex items-center gap-2">
          Answer a question <Ellipsis className="h-4 w-4 text-gray-400" />
        </div>
      ),
      columns: [
        columnHelper.accessor("priority", {
          header: "Priority",
          size: 100,
          cell: priorityCell,
        }),
        columnHelper.accessor("dueDate", {
          header: "Due Date",
          size: 120,
          ...editableCell(),
        }),
      ],
    },
    {
      id: "extract-group",
      header: () => (
        <div className="bg-orange-100 text-orange-800 px-3 py-1 font-medium text-sm flex items-center gap-2">
          Extract <Ellipsis className="h-4 w-4 text-gray-400" />
        </div>
      ),
      columns: [
        columnHelper.accessor("estValue", {
          header: "Est. Value",
          size: 120,
          ...editableCell(), // Your editable cell logic
        }),
      ],
    },
    {
      id: "plus-group",
      header: () => (
        <div className="flex items-center justify-center bg-gray-300 text-gray-700 px-3 py-1 font-medium text-sm w-28">
          <Plus className="h-4 w-4 text-gray-400" />
        </div>
      ),
      columns: [
        {
          id: "plus-action",
          header: () => (
            <div className="flex items-center justify-center w-[50px] h-full" />
          ),
          size: 50,
          cell: () => (
            <div className="flex items-center justify-center w-[50px] h-full" />
          ),
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
    <div className="w-full bg-white">
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    style={{ width: `${header.getSize()}px` }}
                    onClick={() => handleColumnClick(header.id)}
                  >
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
                className={`group hover:bg-blue-50 transition-colors ${
                  index < 5 ? "bg-white" : "bg-gray-50"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`border border-gray-300 px-3 py-2 text-sm text-gray-800 cursor-pointer transition-colors ${
                      selectedColumn === cell.column.id
                        ? "bg-blue-100 border-blue-300"
                        : "hover:bg-gray-50"
                    }`}
                    style={{ width: `${cell.column.getSize()}px` }}
                    onClick={() => handleColumnClick(cell.column.id)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
