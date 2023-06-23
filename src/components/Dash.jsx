import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import Navbar from "./Navbar";
import chart from "../assets/chart.svg";
import wallet from "../assets/wallet.svg";
import { coins } from "../data";
import axios from "axios";

const API_URL = "https://papertrade-1-m0489875.deta.app";

const Dash = ({ page, setPage }) => {
  useEffect(() => {
    setPage("Dashboard");
  });
  const [portfolio, setPortfolio] = useState();

  const fetchPortfolio = async () => {
    try {
      await axios.get(`${API_URL}/api/v1/portfolio`).then((res) => {
        console.log("portfolio:::", res.data);
        setPortfolio(res.data);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar page={page} />

      <div className="w-full border-grad h-[200px] lg:h-[46vh] p-[3px] rounded-[24px]">
        <div className="w-full h-full flex items-center justify-between rounded-[22px] bg-sidebar">
          <div className="chart-img w-full h-full relative overflow-hidden">
            {/* THE DIV THAT CONTAINS THE ELEMENTS  */}
            <div className="flex items-center gap-4 py-10 z-10 px-10">
              {/* THE WALLET */}
              <div className="w-10 h-10">
                <img src={wallet} alt="wallet.svg" />
              </div>
              {/* THE CONTENT< PRICE  */}
              <div className="flex flex-col items-start text-gray-300 font-Lato">
                <p className="text-sm whitespace-nowrap">Net USD Value</p>
                <span className="text-xl font-medium whitespace-nowrap ">
                  ${" "}
                  {portfolio
                    ? Number(portfolio.totalWalletBalance).toFixed(2) +
                      " " +
                      "≈" +
                      " " +
                      "$" +
                      " " +
                      Number(portfolio.availableBalance).toFixed(2) +
                      " " +
                      "AB"
                    : "Fetching..."}
                </span>
              </div>

              {/* THE PERCENTAGE */}
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
            <div className="flex items-center gap-4 p-8 font-Lato text-gray-300 ">
              <h2 className="text-2xl font-medium ">Portfolio</h2>
            </div>

            {/* THE TABLE */}
            <div className="w-full h-[70%] p-8 text-gray-300 font-Lato scroll-y">
              <table className="w-full md-w-full text-center flex flex-col scroll-x">
                <thead>
                  <tr className="text-center flex w-full">
                    <th className="tables3">Asset</th>
                    <th className="tables3">Side</th>
                    <th className="tables3">Amount</th>
                    <th className="tables3">Leverage</th>
                    <th className="tables3">Changes in %</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio &&
                    portfolio.positions.map((data) => {
                      const percentage =
                        (Number(data.unrealizedProfit) /
                          Number(data.positionAmt)) *
                        100;

                      return (
                        <>
                          {parseInt(data.positionAmt) !== 0 && (
                            <tr className="no-botrow flex w-full">
                              <td className="tables3 flex items-center justify-center gap-2">
                                <span className="text-sm text-gray-300">
                                  {data.symbol}
                                </span>
                              </td>
                              <td className="tables3 py-4 px-6 whitespace-nowrap">
                                <span className="text-sm text-gray-300">
                                  {parseInt(data.positionAmt) < 0
                                    ? "SELL"
                                    : "BUY"}
                                </span>
                              </td>
                              <td className="tables3 py-4 px-6 whitespace-nowrap">
                                <span className="text-sm text-gray-300">
                                  {parseFloat(data.positionAmt).toFixed(2)}
                                </span>
                              </td>
                              <td className="tables3 py-4 px-6 whitespace-nowrap">
                                <span className="text-sm text-gray-300">
                                  {data.leverage}x
                                </span>
                              </td>
                              <td className="tables3 py-4 px-6 whitespace-nowrap">
                                <span
                                  className={`text-sm ${
                                    percentage > 0 ? "text-green" : "text-red"
                                  }`}
                                >
                                  {(
                                    (Number(data.unrealizedProfit) /
                                      Number(data.positionAmt)) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </span>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
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
