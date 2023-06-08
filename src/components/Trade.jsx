import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import { ArrowDown, ArrowDown2, ArrowRight, ArrowSwapHorizontal, Bitcoin, Edit, Glass, Tether } from "iconsax-react";
import TradingViewWidget from "./TradingView";
import { Icon } from "@iconify/react";
import axios from "axios";
import { coins } from "../data";
import BottomNav from "./BottomNav";

const buttons = ["Chart", "Order Book", "Trades"]
const buySell = ["Buy", "Sell"];
const multipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const API_URL = "https://papertrade-1-m4693083.deta.app";
const TradeNav = () => {
  return (
    <div className=" hidden lg:block w-[69%] py-6">
      <div className="w-full flex items-center font-DM">
        {/* THE ICON */}
        <Bitcoin color="#f7931a" size="36" variant="Bold" />
        <table className="text-gray-300">
          <thead>
            <tr className="text-left text-gray-300">
              <th className="tables1">BTC</th>
              <th className="tables1">26,847.1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tables2 text-xs text-inputText">Bitcoin</td>
              <td className="tables2 text-xs text-red">-1.36%</td>
            </tr>
          </tbody>
        </table>

        <hr className="border-l border-inputText h-10 mx-5" />

        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-300">
              <th className="tables1 text-inputText text-xs ">Mark Price</th>
              <th className="tables1 text-inputText text-xs ">Index Price</th>
              <th className="tables1 text-inputText text-xs ">Volume(24h)</th>
              <th className="tables1 text-inputText text-xs flex gap-2 items-center">
                <p>Funding Rate(8h)</p>
                <Icon
                  icon="line-md:question-circle"
                  className="text-[16px] cursor-pointer"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="tables2 text-gray-300">26,847.1</th>
              <th className="tables2 text-gray-300">26,845.8</th>
              <th className="tables2 text-gray-300">1,955,381.9</th>
              <th className="tables2 text-green">+0.0211%</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Trade = () => {
  const [positionData, setPositionData] = useState();

  const getCurrentPositions = async () => {
    try {
      console.log("Getting positions...");
      const res = await axios.get(`${API_URL}/api/v1/positions`);
      console.log("Positions data:::", res.data);
      setPositionData(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getCurrentPositions();
  }, []);


  const [position, setPosition] = useState("long");
  const [positionTwo, setPositionTwo] = useState("position");
  const [marketDrop, setMarketDrop] =  useState(false)
  const [coinDrop, setCoinDrop] = useState(false)
  const [coin, setCoin] = useState("BTC")
  const [market, setMarket] = useState("")
  const [buttonName, setButtonName] = useState("Chart")
  const [buySellButton, setBuySellButton] = useState("Buy")
  const [openLeverage, setOpenLeverage] = useState(false)
  const [leverage, setLeverage] = useState(1)
  
  



  const toggleMarket = () => {
    setMarketDrop(!marketDrop)
  }
 
  const toggleCoin = () => {
    setCoinDrop(!coinDrop)
  }
  
  return (
    <div className={`${styles.container1} bg-sidebarDark`}>
      {/* <Navbar /> */}

      {/* THE TOP PART WHERE THE TRADE NAV IS */}
      <TradeNav />
      <BottomNav />

      {/* THE TRADING VIEW AND THE PANEL BY THE SIDE */}
      <div className="w-full h-fit flex gap-5 items-stretch justify-between">
        {/* THE TRADING VIEW */}
        <div className="w-full lg:w-[69%] flex  border-grad-trade rounded-none  lg:rounded-[24px] p-0  lg:p-[2px]">
          <div className=" bg-sidebar rounded-none lg:rounded-[22px] w-full overflow-hidden">
            <div className="w-full p-[2px] flex items0center justify-between  ">
              {/* THE PRICE AND FUNDING */}
              <div className=" p-4 flex items-center gap-2 justify-between font-DM">
                <button className="bg-gray-300 cursor-pointer rounded-full w-[48%] text-xs font-medium text-sidebar px-2 py-1">
                  Price
                </button>
                <button className="text-gray-400 cursor-pointer rounded-full w-[48%] text-xs px-2 py-1 text-medium">
                  Funding
                </button>
              </div>

              {/* THE GLASSES AND SWITCH */}
              <div className="flex items-center gap-2 pr-4">
                <Glass size="14" color="#D1D5DB" />
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <TradingViewWidget />
          </div>
        </div>
        {/* THE PANEL ON THE RIGHT */}
        <div className=" hidden lg:block w-[31%] border-grad rounded-[14px] p-[2px] ">
          <div className="bg-sidebar rounded-[12px] w-full overflow-hidden flex flex-col items-center">
            {/* SWITCH */}
            <div className="w-full p-4 flex items-center justify-between">
              <button
                onClick={() => {
                  setPosition("long");
                }}
                className={
                  position === "long" ? styles.longBtn : styles.notLongBtn
                }
              >
                Long
              </button>
              <button
                onClick={() => {
                  setPosition("short");
                }}
                className={
                  position === "short" ? styles.longBtn : styles.notLongBtn
                }
              >
                Short
              </button>
            </div>

            {/* THE FORM FOR THE OPTIONS */}
            <div className="w-full  p-4">
              <form>
                <div className="w-full flex items-center justify-center text-gray-300 gap-3">
                  <div className="w-1/2 flex flex-col items-start font-DM">
                    <label className="text-xs mb-2">Price</label>
                    <input
                      type="number"
                      placeholder="0.0"
                      className="text-gray-600 border-input border rounded-full w-full text-sm placeholder:text-inputText px-2 py-1"
                    />
                  </div>

                  <div className="w-1/2 flex flex-col items-start font-DM">
                    <label className="text-xs mb-2">Order Type</label>
                    <div
                      onClick={toggleMarket}
                      className="text-gray-600 cursor-pointer border-input border rounded-full w-full placeholder:text-inputText text-sm px-2 py-1 relative "
                    >
                      <input
                        type="text"
                        placeholder="Markets"
                        className="text-inputText pointer-events-none placeholder:text-inputText"
                        disabled
                        value={market}
                      />

                      <ArrowDown
                        color="#42424262"
                        size="20"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2"
                      />

                      {/* THE DROP DOWN */}
                      <div
                        className={
                          marketDrop === true ? "drop-open" : "drop-close"
                        }
                      >
                        {coins.map((item) => (
                          <p
                            key={item.id}
                            onClick={() => {
                              setMarket(item.code);
                            }}
                          >
                            {item.code}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col items-start mt-8 font-DM text-gray-300">
                  <label className="text-xs mb-2">Amount</label>
                  <div className="w-full flex flex-col">
                    <div
                      onClick={toggleCoin}
                      className="relative cursor-pointer flex items-center gap-2 border-input border rounded-tr-2xl rounded-tl-2xl px-2 py-1  "
                    >
                      {/* DIV FOR THE ICON AND THE TEXT */}
                      <div className="flex items-center gap-1 pointer-events-none">
                        <Bitcoin variant="Bold" color="#f7931a" size="16" />
                        <p className="text-xs text-inputText font-medium">
                          {coin}
                        </p>
                      </div>
                      {/* THE MAIN INPUT FIELD */}
                      <input
                        type="number"
                        disabled
                        className="w-full text-sm pointer-events-none"
                        value={coin}
                      />

                      {/* THE DROP DOWN */}
                      <div
                        className={
                          coinDrop === true ? "drop-open" : "drop-close"
                        }
                      >
                        {coins.map((item) => (
                          <p
                            onClick={() => {
                              setCoin(item.code);
                            }}
                          >
                            {item.code}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 border-input border rounded-br-2xl rounded-bl-2xl px-2 py-1  ">
                      {/* DIV FOR THE ICON AND THE TEXT */}
                      <div className="flex items-center gap-1">
                        <Tether variant="Bold" color="#6DDE09" size="16" />
                        <p className="text-xs text-inputText font-medium">
                          USD
                        </p>
                      </div>
                      {/* THE MAIN INPUT FIELD */}
                      <input type="number" className="w-full " />
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col items-start font-DM text-gray-300 mt-8">
                  <label className="text-xs mb-2">Leverage</label>
                  <input type="range" className="w-full my-range" />
                </div>
              </form>
            </div>
            <h2 className="mt-9 text-gray-300 text-left w-full px-4 text-xs font-DM mb-1">
              Summary
            </h2>
            <div className="w-full  border-t-[1px] border-input p-4 flex items-center justify-between gap-6 font-DM">
              <button className="flex bg-darkGreen flex-1 rounded-full items-center justify-center py-1 gap-2">
                <div className="text-sm  ">
                  <ArrowRight
                    size="18"
                    color="#000"
                    className="transform -rotate-45"
                  />
                </div>
                <p className="text-sm font-medium">
                  Confirm {position === "long" ? "Long" : "Short"}
                </p>
              </button>
              {/* <Setting2 size="20" className="text-gray-300" /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-fit hidden lg:flex gap-5 mt-4 items-stretch justify-between">
        {/* THE TRADING VIEW */}
        <div className="w-[69%] border-grad rounded-[24px] p-[2px] flex ">
          <div className="bg-sidebar rounded-[22px] w-full overflow-hidden">
            <div className="w-full p-[2px] flex items0center justify-between  ">
              {/* THE POSITION AND ORDERS */}
              <div className="p-4 flex items-center gap-2 justify-between font-DM">
                <button
                  onClick={() => {
                    setPositionTwo("position");
                  }}
                  className={
                    positionTwo === "position"
                      ? styles.isNotFills
                      : styles.isFills
                  }
                >
                  Position
                </button>

                <button
                  onClick={() => {
                    setPositionTwo("fills");
                  }}
                  className={
                    positionTwo === "fills" ? styles.isNotFills : styles.isFills
                  }
                >
                  Fills
                </button>
              </div>
            </div>

            {/* THE DIV FOR THE CONTAINER UNDER */}
            <div className="w-full self-stretch p-4 font-DM">
              <div className="w-full h-full flex items-end justify-center">
                <div className="w-full">
                  <table className="min-w-full border-gray-200">
                    <thead>
                      <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Symbol
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Side
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount Bought
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {positionData ? (
                        <>
                          {positionData.map((data) => (
                            <tr>
                              <td className="py-4 px-6 whitespace-nowrap">
                                <span className="text-sm text-gray-900">
                                  {data.symbol}
                                </span>
                              </td>
                              <td className="py-4 px-6 whitespace-nowrap">
                                <span className="text-sm text-gray-900">
                                  {data.side}
                                </span>
                              </td>
                              <td className="py-4 px-6 whitespace-nowrap">
                                <span className="text-sm text-gray-900">
                                  {parseFloat(data.cost_basis * 1000).toFixed(
                                    2
                                  )}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <p>You do not have any positions yet</p>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* THE RIGHT PANEL OF TABLES */}
        <div className="w-[31%] border-grad rounded-[14px] p-[2px] ">
          <div className="bg-sidebar rounded-[12px] w-full overflow-hidden flex flex-col items-center">
            {/* MARKETS AND TRADE TIME */}
            <div className="w-full p-4 flex items-center justify-between font-DM">
              <h4 className="text-gray-300 text-sm ">Market Trades</h4>
              <p className="text-sm text-inputText font-medium font-DM">24H</p>
            </div>

            <table className="mt-5 text-gray-300 text-left w-full px-4 text-xs font-DM mb-1">
              <thead>
                <tr className="text-gray-500">
                  <th className="text-left  tables">SIZE</th>
                  <th className="text-center  tables">TIME</th>
                  <th className="text-right tables ">PRICE</th>
                </tr>
              </thead>
              <tbody>
                <tr className="w-full ">
                  <td className="text-left tables-body text-green">0.108349</td>
                  <td className="text-center tables-body text-inputText">
                    5/7 14:55
                  </td>
                  <td className="text-right tables-body text-gray-500">
                    26,839.9
                  </td>
                </tr>
                <tr className="w-full ">
                  <td className="text-left tables-body text-green">0.108349</td>
                  <td className="text-center tables-body text-inputText">
                    5/7 14:55
                  </td>
                  <td className="text-right tables-body text-gray-500">
                    26,839.9
                  </td>
                </tr>
                <tr className="w-full ">
                  <td className="text-left tables-body text-green">0.108349</td>
                  <td className="text-center tables-body text-inputText">
                    5/7 14:55
                  </td>
                  <td className="text-right tables-body text-gray-500">
                    26,839.9
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FOR THE MOBILE PART */}
      <div className="w-full h-fit flex lg:hidden items-stretch justify-between">
        <div className="w-full border-grad-trade2 flex ">
          <div className="bg-sidebar w-full overflow-hidden">
            {/* ORDER BUTTONS AND CO */}
            <div className="w-full flex items-center justify-center gap-3 text-inputText font-DM">
              {buttons.map((item, idx) => (
                <button
                  style={{
                    background: buttonName === item ? "#424242" : "#42424262",
                    color: buttonName === item ? "#d1d5db" : "#424242",
                  }}
                  key={idx}
                  onClick={() => {
                    setButtonName(item);
                  }}
                  className="py-1 text-sm px-4 rounded-full bg-inputPh"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* THE DIV FOR THE CONTAINER UNDER */}
            <div className="w-full self-stretch p-4 bg-input mt-8 rounded-tl-[26px] rounded-tr-[26px] font-DM text-gray-300">
              <div className="w-full h-full flex items-center justify-between flex-col">
                {/* THE LEVERAGE DIV */}
                <div className="w-full flex items-start justify-between">
                  <div onClick={() => {
                    setOpenLeverage(!openLeverage);
                  }} className="flex items-center relative gap-1">
                    <p className="text-sm">Leverage: {leverage}x </p>
                    <ArrowDown2 variant="Bold" size="16" />

                    {/* THE DROP DOWN */}
                    <div
                      className={
                        openLeverage === true ? "drop-open" : "drop-close"
                      }
                    >
                      {multipliers.map((item,idx) => (
                        <p
                          key={idx}
                          onClick={() => {
                            setLeverage(item);
                          }}
                          className="pl-10"
                        >
                          {item}x
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-inputText">
                      Funding / Countdown{" "}
                    </p>
                    <span className="text-sm font-bold">
                      0.0100% / 00:07:41
                    </span>
                  </div>
                </div>

                {/* THE BUY SELL BUTONS DIV */}
                <div className="w-full flex items-center rounded overflow-hidden mt-2">
                  {buySell.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setBuySellButton(item);
                      }}
                      className={`${
                        buySellButton === item
                          ? `${
                              item === "Buy" ? "bg-green" : "bg-btc"
                            } text-white`
                          : "bg-inputText"
                      } py-1 w-1/2`}
                    >
                      {item}{" "}
                    </button>
                  ))}
                </div>

                {/* THE AVAILABLE DIV */}
                <div className="w-full flex items-center flex-col justify-between rounded overflow-hidden mt-2">
                  {/* AVAILABLE */}
                  <div className="flex justify-between w-full mt-2 items-center">
                    <p className="text-xs">Available</p>
                    <div className="flex items-center gap-1">
                      <p className="text-sm">0 USDT</p>
                      <ArrowSwapHorizontal
                        // variant="Bold"
                        color="#f7931a"
                        size="16"
                      />
                    </div>
                  </div>

                  {/* DIV FOR THE INPUT FIELD */}
                  <div className="w-full bg-input mt-2 relative">
                    <p className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500">
                      USDT
                    </p>
                    <input
                      type="text"
                      placeholder="Order Amount"
                      className="p-3 py-4 placeholder:text-gray-400 text-sm text-gray-300"
                    />
                  </div>

                  {/* TRANSFER NOW */}
                  <p className="w-full text-left text-xs mt-1 ">
                    No balance. <span className="text-btc">Transfer Now</span>{" "}
                  </p>

                  {/* EST AMOUNT< PRICE < SLIPPAGE TOLERANCE */}
                  <div className="w-full flex flex-col gap-2 mt-5">
                    {/* EST AMOUNT */}
                    <div className="w-full flex items-center justify-between">
                      <p className="text-sm text-gray-500">Est. Amount</p>
                      <span className="text-sm text-gray-300">-- BTC</span>
                    </div>
                    {/* EST PRICE */}
                    <div className="w-full flex items-center justify-between">
                      <p className="text-sm text-gray-500">Est. Price</p>
                      <span className="text-sm text-gray-300">-- BTC</span>
                    </div>

                    {/*SLIPPAGE TOLERANCE */}
                    <div className="w-full flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Slippage Tolerance
                      </p>
                      <div className="text-sm flex items-center text-gray-300">
                        <p>0.10%</p>
                        <Edit variant="TwoTone" size="16" />
                      </div>
                    </div>
                  </div>

                  <button className="w-full p-4 text-sm text-white bg-green rounded mt-3 mb-[3rem]">
                    Buy / {position === "long" ? "Long" : "Short"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* THE RIGHT PANEL OF TABLES */}

        <div className="h-[200px]"></div>
      </div>

      <div className="h-14"></div>
    </div>
  );
};

export default Trade;
