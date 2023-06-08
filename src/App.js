// import { useState } from 'react';
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { GlobalProvider } from "./context";

function App() {
  // const [routes, setRoutes] = useState("")

  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trade" element={<Dashboard />} />
        <Route path="/stake" element={<Dashboard />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/copytrading" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Dashboard />} />
        <Route path="/trading-bot" element={<Dashboard />} />
        <Route path="/nft-marketplace" element={<Dashboard />} />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
