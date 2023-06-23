import React, { useState } from "react";
import MessageIcon from "../assets/message_icon.svg";
import BellIcon from "../assets/Bell.svg";

const TradeNavbar = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div className={`flex flex-row h-[100px] items-center justify-evenly`}>
      <div
        className={`md:flex flex-row items-center text-white space-x-[20px] hidden`}
      >
        <p className={`cursor-pointer`}>InVest Tutorials</p>
        <p className={`cursor-pointer`}>Blog</p>
        <p className={`cursor-pointer`}>CopyTrade</p>
        <p className={`cursor-pointer`}>Leaderboard</p>
        <p className={`cursor-pointer`}>Stake IT</p>
      </div>

      <div className={`flex flex-row items-center space-x-[20px] text-white`}>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="toggle"
            className="hidden"
            checked={isChecked}
            onChange={handleToggle}
          />
          <label
            htmlFor="toggle"
            className={`relative inline-block w-10 h-6 bg-gray-300 rounded-full cursor-pointer ${
              isChecked ? "bg-green" : "bg-gray-400"
            }`}
          >
            <span
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition transform ${
                isChecked ? "translate-x-4" : ""
              }`}
            />
          </label>
          <span className="ml-2 text-sm">{isChecked ? "On" : "Off"}</span>
        </div>
        <p>ZK/Privacy</p>
      </div>

      <div className={`flex flex-row items-center space-x-[20px]`}>
        <img src={MessageIcon} alt="" className={`w-[30px] cursor-pointer`} />
        <img src={BellIcon} alt="" className={`w-[40px] cursor-pointer`} />
      </div>
    </div>
  );
};

export default TradeNavbar;
