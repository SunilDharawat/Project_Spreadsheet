import React from "react";
import { Search, Bell, MoreHorizontal } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SpreadsheetHeader = () => {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between px-4 py-2 h-auto gap-4 sm:gap-2">
        {/* Frist Section - Navigation */}
        <div className="flex flex-wrap items-center space-x-2 min-w-0">
          {/* Custom Google Sheets icon */}
          <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center mr-3">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-green-600 rounded-sm"></div>
                <div className="bg-green-600 rounded-sm"></div>
                <div className="bg-green-600 rounded-sm"></div>
                <div className="bg-green-600 rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Breadcrumb navigation - this is ShadCN UI Elements for Breadcrumbs */}
          <Breadcrumb className="truncate max-w-[180px] sm:max-w-xs md:max-w-sm lg:max-w-md">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Workspace
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Folder 2
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm text-gray-800 font-medium truncate">
                  Spreadsheet 3
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* three dot menu to shows more options */}
          <button
            className="ml-2 p-1 hover:bg-gray-100 rounded"
            onClick={() => console.log("More options button clicked")}
          >
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Second Section  - Search bar and User Profile */}
        <div className="flex items-center flex-wrap gap-3 sm:gap-4">
          {/* Search bar to search the anything from the sheet.*/}
          <div className="relative w-full sm:w-auto sm:min-w-[200px] md:min-w-[250px] lg:min-w-[280px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search within sheet..."
              className="pl-10 pr-4 py-2 w-full bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:bg-white focus:shadow-sm transition-all"
              onChange={(e) => console.log("Search input:", e.target.value)}
            />
          </div>

          {/* Notification bell icon to show the notification for a user*/}
          <div className="relative">
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => console.log("Notification bell clicked")}
            >
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">2</span>
            </div>
          </div>

          {/* Profile Section with the Name and Email addresss*/}
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
              <AvatarFallback className="bg-blue-500 text-white text-sm font-medium">
                JD
              </AvatarFallback>
            </Avatar>
            {/* Responsive for the mobile view */}
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-gray-800">John Doe</div>
              <div className="text-xs text-gray-500 ">john.doe@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetHeader;
