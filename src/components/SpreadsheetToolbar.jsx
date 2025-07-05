import React from "react";
import {
  ChevronRight,
  EyeOff,
  ArrowUpDown,
  Filter,
  Grid3X3,
  Download,
  Upload,
  Share,
  Plus,
  ChevronsRight,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SpreadsheetToolbar = () => {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between px-2 sm:px-4 py-2 gap-2">
        {/* First Section - Toolbar Actions */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
          <Button
            variant="ghost"
            className="cursor-pointer text-sm px-2 py-1.5 whitespace-nowrap"
            onClick={() => console.log("Toolbar clicked")}
          >
            Tool bar
            <ChevronsRight className="ml-1 w-4 h-4" />
          </Button>

          <div className="hidden sm:block w-px h-6 bg-gray-300 mx-1" />

          <Button
            variant="ghost"
            className="cursor-pointer text-sm px-2 sm:px-3 py-1.5 whitespace-nowrap"
            onClick={() => console.log("Hide fields clicked")}
          >
            <EyeOff className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Hide fields</span>
          </Button>

          <Button
            variant="ghost"
            className="cursor-pointer text-sm px-2 sm:px-3 py-1.5 whitespace-nowrap"
            onClick={() => console.log("Sort clicked")}
          >
            <ArrowUpDown className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Sort</span>
          </Button>

          <Button
            variant="ghost"
            className="cursor-pointer text-sm px-2 sm:px-3 py-1.5 whitespace-nowrap"
            onClick={() => console.log("Filter clicked")}
          >
            <Filter className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Filter</span>
          </Button>

          <Button
            variant="ghost"
            className="cursor-pointer text-sm px-2 sm:px-3 py-1.5 whitespace-nowrap"
            onClick={() => console.log("Cell view clicked")}
          >
            <Grid3X3 className="w-4 h-4 mr-1" />
            <span className="hidden md:inline">Cell view</span>
          </Button>
        </div>

        {/* Second Section - Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 ml-2">
          <Button
            variant="outline"
            className="text-sm whitespace-nowrap cursor-pointer"
            onClick={() => console.log("Import clicked")}
          >
            <Download className="w-4 h-4 mr-1" />
            <span className="hidden lg:inline">Import</span>
          </Button>

          <Button
            variant="outline"
            className="text-sm whitespace-nowrap cursor-pointer"
            onClick={() => console.log("Export clicked")}
          >
            <Upload className="w-4 h-4 mr-1" />
            <span className="hidden lg:inline">Export</span>
          </Button>

          <Button
            variant="outline"
            className="text-sm whitespace-nowrap cursor-pointer "
            onClick={() => console.log("Share clicked")}
          >
            <SquareArrowOutUpRight className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Share</span>
          </Button>

          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700 text-white text-sm cursor-pointer  whitespace-nowrap"
            onClick={() => console.log("New Action clicked")}
          >
            <Plus className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">New Action</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetToolbar;
