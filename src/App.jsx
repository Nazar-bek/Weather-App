import { useState } from "react";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import ErrorBoundry from "./components/ErrorBoundry";

function App() {
  return (
    <>
      <ErrorBoundry>
        <main className="min-h-screen bg-[#f8f9fa] lg:pt-10 dark:bg-[#212529] text-[#212529] dark:text-[#f8f9fa]  transition">
          <Dashboard />
        </main>
      </ErrorBoundry>
    </>
  );
}

export default App;
