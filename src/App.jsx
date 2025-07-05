import React from "react";
import SpreadsheetHeader from "./components/SpreadsheetHeader";
import SpreadsheetToolbar from "./components/SpreadsheetToolbar";
import SpreadsheetTable from "./components/SpreadsheetTable";
import SpreadsheetBottomNav from "./components/SpreadsheetBottomNav";

function App() {
  return (
    // Here we are combining the all our components to make our application
    <div>
      <SpreadsheetHeader />
      <SpreadsheetToolbar />
      <SpreadsheetTable />
      <SpreadsheetBottomNav />
    </div>
  );
}

export default App;
