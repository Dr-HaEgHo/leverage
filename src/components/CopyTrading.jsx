import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { styles } from "../styles";
import { Icon } from "@iconify/react";

const CopyTrading = ({ page, setPage }) => {
  useEffect(() => {
    setPage("Copytrading");
  });

  return (
    <div className={styles.container}>
      <Navbar page={page} />
      <div className="w-full items-start gap-5 justify-between ">
        <div className="w-[63%] text-gray-300 font-Lato">
          {/* OVERVIEW */}
          <div className="w-full border-grad p-[3px] rounded-[24px]">
            <div className="w-full h-full flex flex-col items-start p-6 justify-between rounded-[22px] bg-sidebar">
              <h4 className="text-2xl mb-5 font-medium">Overview</h4>

              {/* BUTTONS */}
              <div className="w-[94%] mx-auto flex gap-8 items-center mb-8">
                <div className="border-grad min-w-[160px] p-[2px] rounded-full ">
                  <div className="w-full h-full bg-sidebar rounded-full flex items-center justify-center gap-1 px-3 py-1 ">
                    <p className="font-Lato text-base whitespace-nowrap">
                      USDT Perpetual
                    </p>
                    <Icon icon="bx:chevron-down" className="text-accent" />
                  </div>
                </div>

                <hr className="h-9 w-[1px] opacity-30 border-none border-grad-vert " />
                {/* BUTTON WRAPPER */}
                <div className="flex items-center gap-3 justify-between">
                  {/* BUTTON */}
                  <div className="border-grad p-[2px] rounded-full ">
                    <div className="w-full h-full bg-sidebar rounded-full flex items-center justify-center gap-1 px-3 py-1 font-Lato text-lg">
                      24H
                    </div>
                  </div>
                  {/* BUTTON */}
                  <div className="border-grad p-[2px] rounded-full ">
                    <div className="w-full h-full bg-sidebar rounded-full flex items-center justify-center gap-1 px-3 py-1 font-Lato text-lg">
                      24H
                    </div>
                  </div>
                  {/* BUTTON */}
                  <div className="border-grad p-[2px] rounded-full ">
                    <div className="w-full h-full bg-sidebar rounded-full flex items-center justify-center gap-1 px-3 py-1 font-Lato text-lg">
                      24H
                    </div>
                  </div>
                  {/* BUTTON */}
                  <div className="border-grad p-[2px] rounded-full ">
                    <div className="w-full h-full bg-sidebar rounded-full flex items-center justify-center gap-1 px-3 py-1 font-Lato text-lg">
                      24H
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI & TOTAL PNL */}
              <div className="w-[90%] mx-auto flex items-center justify-between">
                <div className="flex flex-col items-start ">
                  <p>ROI (%)</p>
                  <span className="font-medium text-2xl text-textGreen">
                    +3,287.00%
                  </span>
                </div>
                <div className="flex flex-col items-start ">
                  <p>ROI (%)</p>
                  <span className="font-medium text-2xl text-textGreen">
                    6,728.23 USD
                  </span>
                </div>
              </div>

              {/* WINRATE & TRADES */}
              <div className="w-[90%] mx-auto flex items-center mt-5 justify-between">
                <div className="flex flex-col items-start ">
                  <p>ROI (%)</p>
                  <span className="font-medium text-2xl text-textGreen">
                    +3,287.00%
                  </span>
                </div>
                <div className="flex flex-col items-start ">
                  <p>ROI (%)</p>
                  <span className="font-medium text-2xl text-textGreen">
                    6,728.23 USD
                  </span>
                </div>
              </div>

              {/* COPYTRADE BUTTON */}
              <div className="w-[90%] mx-auto flex items-center mt-8 justify-between">
                <div className="border-grad min-w-[160px] text-center font-semibold p-[2px] rounded-full ">
                  Copytrade
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* THE RIGHT SIDE */}
        <div className="w-[37%]"></div>
      </div>
    </div>
  );
};

export default CopyTrading;
