import React, { useEffect } from "react";
import { styles } from "../styles";
import Navbar from "./Navbar";
import chart from "../assets/chart.svg";
import wallet from "../assets/wallet.svg";
import { coins } from "../data";

const Dash = ({ page, setPage }) => {
  useEffect(() => {
    setPage("Dashboard");
  });

  return (
    <div className={styles.container}>
      <Navbar page={page} />

      <div className="w-full border-grad h-fit lg:h-[46vh]  p-[3px] rounded-[24px]">
        <div className="w-full h-full flex items-center justify-between rounded-[22px] bg-sidebar">
          <div className="chart-img w-full h-full relative overflow-hidden">

            {/* THE DIV THAT CONTAINS THE ELEMENTS  */}
            <div className="flex items-center gap-4 py-10 z-10">
              {/* THE WALLET */}
              <div className="w-10 h-10">
                <img src={wallet} alt="wallet.svg" />
              </div>
              {/* THE CONTENT< PRICE  */}
              <div className="flex flex-col items-start text-gray-300 font-DM">
                <p className="text-sm whitespace-nowrap">Net USD Value</p>
                <span className="text-xl font-medium whitespace-nowrap ">$ 6,942.0</span>
              </div>

              {/* THE PERCENTAGE */}
              <p className="font-DM text-green self-end ml-20 font-medium text-xl">
                +2.8%
              </p>
            </div>
            
                    
            {/* THE IMAGE PLASEC AS ABSOLUTE TO THE CONTAINER */}
            <img
              className="absolute min-w-[103%] -z-0 bottom-0 left-1/2 transform -translate-x-1/2"
              src={chart}
              alt="chart.svg"
            />
          </div>
        </div>
      </div>

      {/* THE PORTFOLIO SECTION */}
      <div className="w-full border-grad h-[60vh] p-[3px] rounded-[24px] mt-9">
        <div className="w-full h-full flex items-center justify-between rounded-[22px] bg-sidebar">
          <div className="w-full h-full relative overflow-hidden">
            {/* THE TITLE  */}
            <div className="flex items-center gap-4 p-8 font-DM text-gray-300 ">
              <h2 className="text-2xl font-medium ">Portfolio</h2>
            </div>

            {/* THE TABLE */}
            <div className="w-full h-[70%] p-8 text-gray-300 font-DM scroll-y">
              <table className="w-fit lg-w-full text-center flex flex-col scroll-x">
                <thead>
                  <tr className="text-center flex w-full">
                    <th className="tables3">Asset</th>
                    <th className="tables3">Amount</th>
                    <th className="tables3">Value In USD</th>
                    <th className="tables3">Leverage</th>
                    <th className="tables3">Change in % (24h)</th>
                  </tr>
                </thead>
                <tbody>
                  {coins.map((item) => (
                    <tr className="no-botrow flex w-full">
                      <td className="tables3 flex items-center justify-center gap-2">
                        {item.icon}
                        <p>{item.code}</p>
                      </td>
                      <td className="tables3">
                        {parseFloat(item.price) * 140063}
                      </td>
                      <td className="tables3">{item.price}</td>
                      <td className="tables3">x{parseFloat(item.price)}</td>
                          <td className={`tables3 ${ item.percent > 0.3 ? 'text-green' : 'text-red'}`}>${ item.percent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-14"></div>
    </div>
  );
};

export default Dash;
