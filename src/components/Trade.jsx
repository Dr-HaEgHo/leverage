import React, { useEffect, useState, useContext } from "react";
import { styles } from "../styles";
import {
  ArrowDown,
  ArrowDown2,
  ArrowRight,
  ArrowSwapHorizontal,
  Bitcoin,
  Edit,
  Glass,
  Tether,
} from "iconsax-react";
import TradingViewWidget from "./TradingView";
import { Icon } from "@iconify/react";
import axios from "axios";
import { coins } from "../data";
import BottomNav from "./BottomNav";
import { BiErrorCircle } from "react-icons/bi";
import { GlobalContext } from "../context";
import TradeNavbar from "./TradeNavbar";

const buttons = ["Chart", "Order Book", "Trades"];
const buySell = ["Long", "Short"];
const multipliers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const API_URL = "https://papertrade-1-m0489875.deta.app";

const TradeNav = () => {
  return (
    <div className=" hidden lg:block w-[69%] py-6">
      <div className="w-full flex items-center font-Lato">
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
  const [positionData, setPositionData] = useState(null);
  const [tradables, setTradables] = useState();
  const [tradeLoad, setTradeLoad] = useState(false);
  const { setSymbol } = useContext(GlobalContext);

  const getCurrentPositions = async () => {
    setPositionData(null);
    try {
      console.log("Getting positions...");
      const res = await axios.get(`${API_URL}/api/v1/positions`);
      console.log("Positions data:::", res.data);
      setPositionData(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTradableSymbols = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/exchange-info`);
      console.log("Tradable data:::", res.data);
      setTradables(res.data.symbols);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getCurrentPositions();
    getTradableSymbols();
  }, []);

  const [position, setPosition] = useState("Long");
  const [positionTwo, setPositionTwo] = useState("position");
  const [marketDrop, setMarketDrop] = useState(false);
  const [coinDrop, setCoinDrop] = useState(false);
  const [coin, setCoin] = useState("");
  const [market, setMarket] = useState("");
  const [buttonName, setButtonName] = useState("Chart");
  const [buySellButton, setBuySellButton] = useState("Long");
  const [openLeverage, setOpenLeverage] = useState(false);
  const [leverage, setLeverage] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [price, setPrice] = useState(0);

  const placeTradeOrder = async () => {
    setTradeLoad(true);
    if (quantity === "" || market === "") {
      setErrorMessage("Quantity or Order type cannot be empty");
    } else if (leverage <= 1) {
      setErrorMessage("Leverage cannot be less than 2");
    } else if (market === "Limit" && price === "") {
      setErrorMessage("Price cannot be empty");
    } else if (coin === "") {
      setErrorMessage("Please pick an asset");
    } else {
      try {
        const data = {
          leverage: leverage,
          symbol: coin,
          side: position === "Long" ? "BUY" : "SELL",
          type: market,
          quantity: quantity,
          price: Number(price),
        };
        await axios.post(`${API_URL}/api/v1/order`, data).then((res) => {
          console.log("Order res:::", res.data);
          if (res.status === 200 || res.status === 201) {
            setTradeLoad(false);
            console.log("message status:::", res.data.status_code);
            if (res.data.status_code >= 400) {
              setErrorMessage(res.data.detail);
            } else {
              setSuccessModal(true);
              getCurrentPositions();
            }
          } else {
            alert("Something went wrong. Can't start order.");
            setTradeLoad(false);
          }
        });
      } catch (err) {
        console.log(err.message);
        setTradeLoad(false);
      }
    }
  };

  const toggleMarket = () => {
    setMarketDrop(!marketDrop);
  };

  const toggleCoin = () => {
    setCoinDrop(!coinDrop);
  };

  return (
    <div className={`${styles.container1} bg-sidebarDark`}>
      <TradeNavbar />

      {/* THE TOP PART WHERE THE TRADE NAV IS */}
      {/* <TradeNav /> */}
      {/* <BottomNav /> */}

      {/* THE TRADING VIEW AND THE PANEL BY THE SIDE */}
      <div className="w-full h-fit flex gap-5 items-stretch justify-between">
        {/* THE TRADING VIEW */}
        <div className="w-full lg:w-[69%] flex  border-grad-trade rounded-none  lg:rounded-[24px] p-0  lg:p-[2px]">
          <div className=" bg-sidebar rounded-none lg:rounded-[22px] w-full overflow-hidden">
            <div className="w-full p-[2px] flex items0center justify-between  ">
              {/* THE PRICE AND FUNDING */}
              <div className=" p-4 flex items-center gap-2 justify-between font-Lato">
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
                  setPosition("Long");
                }}
                className={
                  position === "Long" ? styles.longBtn : styles.notLongBtn
                }
              >
                Long
              </button>
              <button
                onClick={() => {
                  setPosition("Short");
                }}
                className={
                  position === "Short" ? styles.longBtn : styles.notLongBtn
                }
              >
                Short
              </button>
            </div>

            {/* THE FORM FOR THE OPTIONS */}
            <div className="w-full  p-4">
              <form>
                <div className="w-full flex items-center justify-center text-gray-300 gap-3">
                  <div className="w-1/2 flex flex-col items-start font-Lato">
                    <label className="text-xs mb-2">Quantity</label>
                    <input
                      type="text"
                      placeholder="0.0"
                      className="text-white border-input border rounded-full w-full text-sm 
                      placeholder:text-inputText px-2 py-1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="w-1/2 flex flex-col items-start font-Lato">
                    <label className="text-xs mb-2">Order Type</label>
                    <div
                      onClick={toggleMarket}
                      className="text-gray-600 cursor-pointer border-input border rounded-full 
                      w-full placeholder:text-inputText 
                      text-sm px-2 py-1 relative "
                    >
                      <input
                        type="text"
                        placeholder="Markets"
                        className="text-white pointer-events-none placeholder:text-inputText"
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
                        <p
                          onClick={() => {
                            setMarket("MARKET");
                          }}
                        >
                          MARKET
                        </p>
                        <p
                          onClick={() => {
                            setMarket("LIMIT");
                          }}
                        >
                          LIMIT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {market === "LIMIT" && (
                  <div className={`mt-[20px]`}>
                    <label className="text-xs mb-2 text-white">Price</label>
                    <input
                      type="number"
                      placeholder="0.0"
                      className="text-white border-input border rounded-full w-full text-sm 
                      placeholder:text-inputText px-2 py-1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                )}

                <div className="w-full flex flex-col items-start mt-8 font-Lato text-gray-300">
                  <label className="text-xs mb-2">Asset</label>
                  <div className="w-full flex flex-col">
                    <div
                      onClick={toggleCoin}
                      className="relative cursor-pointer flex items-center gap-2 
                      border-input border rounded-tr-2xl rounded-tl-2xl px-2 py-1  "
                    >
                      {/* DIV FOR THE ICON AND THE TEXT */}
                      <div className="flex items-center gap-1 pointer-events-none">
                        <p className="text-xs text-white font-medium">{coin}</p>
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
                        {tradables?.map((item) => (
                          <p
                            onClick={() => {
                              setCoin(item.symbol);
                              setSymbol(item.symbol);
                            }}
                          >
                            {item.baseAsset}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 border-input border 
                    rounded-br-2xl rounded-bl-2xl px-2 py-1  "
                    >
                      {/* DIV FOR THE ICON AND THE TEXT */}
                      <div className="flex items-center gap-1">
                        <Tether variant="Bold" color="#6DDE09" size="16" />
                        <p className="text-xs text-white font-medium">USDT</p>
                      </div>
                      {/* THE MAIN INPUT FIELD */}
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col items-start font-Lato text-gray-300 mt-8">
                  <label className="text-xs mb-2">Leverage</label>
                  <input
                    type="range"
                    className="w-full my-range"
                    value={leverage}
                    onChange={(e) => setLeverage(e.target.value)}
                    max={20}
                  />
                  <p className="mt-[10px]">{leverage}x</p>
                </div>
              </form>
            </div>
            <h2 className="mt-9 text-gray-300 text-left w-full px-4 text-xs font-Lato mb-1">
              Summary
            </h2>
            <div className="w-full  border-t-[1px] border-input p-4 flex items-center justify-between gap-6 font-Lato">
              <button
                className="flex bg-buttongreen flex-1 rounded-full items-center justify-center py-1 gap-2"
                onClick={placeTradeOrder}
              >
                {tradeLoad ? (
                  "Loading..."
                ) : (
                  <>
                    <div className="text-sm  ">
                      <ArrowRight
                        size="18"
                        color="#000"
                        className="transform -rotate-45"
                      />
                    </div>
                    <p className="text-sm font-medium">
                      Confirm {position === "Long" ? "Long" : "Short"}
                    </p>
                  </>
                )}
              </button>
              {/* <Setting2 size="20" className="text-gray-300" /> */}
            </div>
          </div>
        </div>
        {successModal && (
          <div
            className="absolute top-0 left-0 bg-[#000000d3] flex justify-center 
          h-full w-full z-50 items-center"
          >
            <div
              className="bg-white p-[20px] md:h-[30%] md:w-[30%] flex 
            justify-center items-center"
            >
              <div className="space-y-5">
                <p className="text-[20px] font-bold text-center">
                  Order Started Successfully!!!
                </p>
                <div className="justify-center flex">
                  <button
                    className="bg-buttongreen py-[10px] px-[50px]
                 rounded-md font-medium"
                    onClick={() => setSuccessModal(false)}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div
            className="absolute top-0 left-0 bg-[#000000d3] flex justify-center 
          h-full w-full z-50 items-center"
          >
            <div
              className="bg-white p-[20px] md:w-[30%] flex 
            justify-center items-center"
            >
              <div className="space-y-5">
                <div className="flex justify-center">
                  <BiErrorCircle className="text-[40px] text-red" />
                </div>
                <p className="text-[20px] font-bold text-center">
                  {errorMessage}
                </p>
                <div className="justify-center flex">
                  <button
                    className="bg-buttongreen py-[10px] px-[50px]
                 rounded-md font-medium"
                    onClick={() => setErrorMessage(null)}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-fit lg:flex gap-5 mt-4 items-stretch justify-between">
        {/* THE TRADING VIEW */}
        <div className="w-full h-[300px] border-grad rounded-[24px] p-[2px] flex">
          <div className="bg-sidebar rounded-[22px] w-full overflow-scroll">
            <div className="w-full p-[2px] flex items-center justify-between">
              {/* THE POSITION AND ORDERS */}
              <div className="p-4 flex items-center gap-2 justify-between font-Lato">
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
              </div>
            </div>

            {/* THE DIV FOR THE CONTAINER UNDER */}
            <div className="w-full self-stretch p-4 font-Lato">
              <div className="w-full h-full flex items-end justify-center">
                <div className="w-full h-[70%] scroll-y">
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
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Leverage
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Change in %
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {positionData ? (
                        <>
                          {positionData.map((data) => {
                            const percentage =
                              (Number(data.unrealizedProfit) /
                                Number(data.positionAmt)) *
                              100;
                            return (
                              <>
                                {parseInt(data.positionAmt) !== 0 && (
                                  <tr>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                      <span className="text-sm text-white">
                                        {data.symbol}
                                      </span>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                      <span className="text-sm text-white">
                                        {parseInt(data.positionAmt) < 0
                                          ? "SELL"
                                          : "BUY"}
                                      </span>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                      <span className="text-sm text-white">
                                        {parseFloat(data.positionAmt).toFixed(
                                          2
                                        )}
                                      </span>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                      <span className="text-sm text-white">
                                        {data.leverage}x
                                      </span>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                      <span
                                        className={`text-sm ${
                                          percentage > 0
                                            ? "text-green"
                                            : "text-red"
                                        }`}
                                      >
                                        {(
                                          (Number(data.unRealizedProfit) /
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
      </div>

      {/* FOR THE MOBILE PART */}
      <div className="w-full h-fit flex lg:hidden items-stretch justify-between">
        <div className="w-full border-grad-trade2 flex ">
          <div className="bg-sidebar w-full overflow-hidden">
            {/* THE DIV FOR THE CONTAINER UNDER */}
            <div className="w-full self-stretch p-4 bg-input mt-8 rounded-tl-[26px] rounded-tr-[26px] font-Lato text-gray-300">
              <div className="w-full h-full flex items-center justify-between flex-col">
                {/* THE BUY SELL BUTONS DIV */}
                <div className="w-full flex items-center rounded overflow-hidden mt-2">
                  {buySell.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setBuySellButton(item);
                        setPosition(item);
                      }}
                      className={`${
                        buySellButton === item
                          ? `bg-green text-white`
                          : "bg-inputText"
                      } py-1 w-1/2`}
                    >
                      {item}{" "}
                    </button>
                  ))}
                </div>

                {/* THE AVAILABLE DIV */}
                <div className="w-full flex items-center flex-col justify-between rounded overflow-hidden mt-2">
                  {/* DIV FOR THE INPUT FIELD */}
                  <div className="w-full bg-input my-[20px]">
                    <input
                      type="number"
                      placeholder="Order Amount"
                      className="p-3 py-4 placeholder:text-gray-400 text-sm text-gray-300"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="w-full flex flex-col items-start font-Lato">
                    <label className="text-xs mb-2">Order Type</label>
                    <div
                      onClick={toggleMarket}
                      className="text-white cursor-pointer border-white 
                      border rounded w-full 
                      placeholder:text-white 
                      text-sm px-2 py-2 relative "
                    >
                      <input
                        type="text"
                        placeholder="Markets"
                        className="text-white pointer-events-none 
                        placeholder:text-white"
                        disabled
                        value={market}
                      />

                      <ArrowDown
                        color="#fff"
                        size="20"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2"
                      />

                      {/* THE DROP DOWN */}
                      <div
                        className={
                          marketDrop === true ? "drop-open" : "drop-close"
                        }
                      >
                        <p
                          onClick={() => {
                            setMarket("MARKET");
                          }}
                        >
                          MARKET
                        </p>
                        <p
                          onClick={() => {
                            setMarket("LIMIT");
                          }}
                        >
                          LIMIT
                        </p>
                      </div>
                    </div>
                  </div>

                  {market === "LIMIT" && (
                    <div className={`mt-[20px] w-full`}>
                      <label className="text-xs mb-2 text-white">Price</label>
                      <input
                        type="text"
                        placeholder="0.0"
                        className="text-white border-white border rounded 
                        w-full text-sm placeholder:text-inputText px-2 py-2"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  )}

                  {/* THE LEVERAGE DIV */}
                  <div className="w-full flex items-start justify-between mt-[20px]">
                    <div
                      onClick={() => {
                        setOpenLeverage(!openLeverage);
                      }}
                      className="w-full mb-[20px]"
                    >
                      <p className="text-sm">Leverage: {leverage}x </p>
                      <input
                        type="range"
                        className="w-full my-range"
                        value={leverage}
                        onChange={(e) => setLeverage(e.target.value)}
                        max={20}
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-start mt-8 font-Lato text-gray-300 mb-[40px]">
                    <label className="text-xs mb-2">Asset</label>
                    <div className="w-full flex flex-col">
                      <div
                        onClick={toggleCoin}
                        className="relative cursor-pointer flex items-center gap-2 border-gray-300 border rounded-tr-2xl 
                        rounded-tl-2xl px-2 py-4  "
                      >
                        {/* DIV FOR THE ICON AND THE TEXT */}
                        <div className="flex items-center gap-1 pointer-events-none">
                          <p className="text-xs text-gray-200 font-medium">
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
                          {tradables?.map((item) => (
                            <p
                              onClick={() => {
                                setCoin(item.symbol);
                                setSymbol(item.symbol);
                              }}
                            >
                              {item.baseAsset}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-2 border-gray-300 border rounded-br-2xl 
                      rounded-bl-2xl px-2 py-4  "
                      >
                        {/* DIV FOR THE ICON AND THE TEXT */}
                        <div className="flex items-center gap-1">
                          <Tether variant="Bold" color="#6DDE09" size="16" />
                          <p className="text-xs text-gray-200 font-medium">
                            USDT
                          </p>
                        </div>
                        {/* THE MAIN INPUT FIELD */}
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full p-4 text-sm text-white bg-green rounded mt-3 mb-[3rem]"
                    onClick={placeTradeOrder}
                  >
                    {tradeLoad
                      ? "Placing order..."
                      : `Confirm ${position === "Long" ? "Long" : "Short"}`}
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
