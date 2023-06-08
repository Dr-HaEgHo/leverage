import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [symbol, setSymbol] = useState("");

  return (
    <GlobalContext.Provider value={{ symbol, setSymbol }}>
      {children}
    </GlobalContext.Provider>
  );
};
