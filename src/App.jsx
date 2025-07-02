import React from "react";
import SpreadsheetHeader from "./components/SpreadsheetHeader";
import SpreadsheetToolbar from "./components/SpreadsheetToolbar";

function App() {
  return (
    // Here we are combining the all our components to make our application
    <div>
      <SpreadsheetHeader />
      <SpreadsheetToolbar />
    </div>
  );
}

export default App;
