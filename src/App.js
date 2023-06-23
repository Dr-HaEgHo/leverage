// import { useState } from 'react';
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { GlobalProvider } from "./context";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { goerli, mainnet, arbitrum } from "wagmi/chains";

const projectId = "acdcbf79f90d39fa1dfe52c5f78b4b8a";

const chains = [goerli, mainnet, arbitrum];

// Wagmi Provider
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: projectId }),
]);

// Wagmi Client
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  // const [routes, setRoutes] = useState("")

  return (
    <>
      <WagmiConfig client={wagmiClient}>
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
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
