import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [symbol, setSymbol] = useState("BTCUSD");
  const [wallet, setWallet] = useState();

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        accountChaneHandler(res[0]);
      });
    } else {
      alert("Please install Metamask");
    }
  };

  const accountChaneHandler = (newAccount) => {
    setWallet(newAccount);
    console.log(wallet);
  };

  return (
    <GlobalContext.Provider
      value={{ symbol, setSymbol, connectWalletHandler, wallet }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
