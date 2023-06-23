import { Bill, Chart21, EmptyWallet, Home, Trade } from "iconsax-react";
import React, { useState } from "react";

const links = [
  { id: 1, title: "Home", icon: <Home variant="Bulk" size="20" /> },
  { id: 2, title: "Markets", icon: <Chart21 variant="Bulk" size="20" /> },
  { id: 3, title: "Trade", icon: <Trade variant="Bulk" size="20" /> },
  { id: 4, title: "Futures", icon: <Bill variant="Bulk" size="20" /> },
  { id: 5, title: "Wallets", icon: <EmptyWallet variant="Bulk" size="20" /> },
];

const BottomNav = () => {
  const [selectedLink, setSelectedLink] = useState("Trade");

  return (
    <div
      className="z-10 fixed bottom-0 font-Lato bg-sidebar text-gray-300 w-full flex items-end justify-between border-t
     border-inputText py-4 px-8"
    >
      {links &&
        links.map((item) => (
          <div
            onClick={() => {
              setSelectedLink(item.title);
            }}
            style={{ color: selectedLink === item.title && "#64C7E3" }}
            className="flex flex-1 flex-col items-center gap-2 transition duration-200"
          >
            {item.icon}
            <p className="text-[10px]">{item.title}</p>
          </div>
        ))}
    </div>
  );
};

export default BottomNav;
