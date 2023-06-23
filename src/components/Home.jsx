import React, { useEffect } from "react";
import { styles } from "../styles";
import Navbar from "./Navbar";
import homeEth from "../assets/homeEth.svg";
import hatGuy from "../assets/HatGuy.svg";
import brain from "../assets/brain.svg";
import { Icon } from "@iconify/react";
import handCoin from "../assets/handCoin.svg";
import ContentSlider from "./ContentSlider";

const Home = ({ setPage, page }) => {
  useEffect(() => {
    setPage("Home");
  });

  return (
    <div className={`${styles.container}`}>
      <Navbar page={page} />

      <div className="w-full">
        <ContentSlider />
        {/* THE OUTER DIV THAT FORMS THE BORDER */}
        <div className="w-full border-grad p-[3px] rounded-[24px]">
          {/* THE INNER DIV THAT  HAS THE CONTENTS */}
          <div
            className="w-full h-full flex flex-col-reverse text-center lg:text-left 
          lg:flex-row items-center justify-between rounded-[22px] py-7 px-8 bg-sidebar"
          >
            <div className="flex flex-col gap-5 items-start text-white">
              <h2 className="text-[24px] lg:text-[38px] font-medium font-Lato">
                Invest in $IT. Leverage $IT. Make $IT
              </h2>
              <div className="flex flex-col lg:flex-row items-center w-full justify-start gap-3 h-fit">
                <div className="border-grad-vert  bg-yellow-300 h-[3px] lg:h-[50px] w-full lg:w-[3px]" />
                <p className="font-Roboto text-base lg:text-[24px] font-medium ">
                  Decentralised leverage protocol <br /> for crypto, stocks and
                  more
                </p>
              </div>
            </div>
            {/* FOR THE ETH IMG */}
            <div className="h-[240px] w-[240px] ">
              <img src={homeEth} alt="homeEth" />
            </div>
          </div>
        </div>

        <div
          className="w-full flex flex-col lg:flex-row 
        items-center justify-between mt-5 "
        >
          {/* THE LEFT OUTER DIV THAT FORMS THE BORDER */}
          <div
            className="w-full lg:w-[49%] lg:h-[300px] mt-5 lg:mt-0 border-grad 
          p-[3px] rounded-[24px] text-white font-Lato"
          >
            {/* THE INNER DIV THAT  HAS THE CONTENTS */}
            <div
              className="w-full h-full flex items-center justify-between 
            rounded-[22px] py-7 px-8 bg-sidebar"
            >
              <div className="flex flex-col items-start">
                <h2
                  className="text-[28px] 2xl:text-3xl 
                whitespace-nowrap font-medium mb-4 font-Mont"
                >
                  ZK Trade Anonymously
                </h2>
                <p className="leading-4 mb-1">
                  Trade anonymously, ensuring your <br /> identity and trading
                  activity are private
                </p>
                <button
                  className="button-grad rounded-full 
                flex items-center gap-2 mt-2 px-2 py-1 "
                >
                  <p>Coming Soon</p>
                  {/* <Icon icon="mdi:arrow-right-thin" className="text-xl" /> */}
                </button>
              </div>
              {/* ICON PART */}
              <div className="w-[80px] mb-1">
                <img src={hatGuy} alt="hatguy.svg" className="w-full" />
              </div>
            </div>
          </div>

          {/* THE RIGHT OUTER DIV THAT FORMS THE BORDER */}
          <div
            className="w-full lg:w-[49%] border-grad p-[3px] mt-5 
          lg:mt-0 rounded-[24px] text-white font-Lato"
          >
            {/* THE INNER DIV THAT  HAS THE CONTENTS */}
            <div
              className="w-full h-full flex items-end justify-between 
            rounded-[22px] py-7 px-8 bg-sidebar"
            >
              <div className="flex flex-col items-start">
                <h2 className="text-[28px] 2xl:text-3xl whitespace-nowrap font-medium mb-4 font-Mont">
                  AI Trading Bot
                </h2>
                <p className="leading-4 mb-1">
                  Al Predictive analysis helps users identify trends and
                  patterns.
                  <br />
                  <br />
                  Essentially, it uses machine learning algorithms to find
                  correlations and patterns in data, and then uses that
                  information to make predictions about future market movements.
                  <br />
                  <br />
                  To gain access to this tool, users are required to hold
                  atleast 0.1% of the native $IT token.
                </p>
                <button className="button-grad rounded-full flex items-center gap-4 mt-2 px-10 py-1 ">
                  <p>Coming Soon</p>
                </button>
              </div>
              {/* ICON PART */}
              <div className="w-[80px] mb-1">
                <img src={brain} alt="hatguy.svg" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-full flex flex-col lg:flex-row 
        items-center justify-between mt-5 "
        >
          <div
            className="w-full lg:w-[49%] mt-5 border-grad p-[3px] 
        rounded-[24px] text-white font-Lato"
          >
            {/* THE INNER DIV THAT  HAS THE CONTENTS */}
            <div
              className="w-full h-full flex items-end 
          justify-between rounded-[22px] py-7 px-8 bg-sidebar"
            >
              <div className="flex flex-col items-start">
                <h2
                  className="text-[28px] 2xl:text-3xl 
              whitespace-nowrap font-medium -mb-3 font-Mont"
                >
                  Stake $IT
                </h2>
                <div className={`my-5`}>
                  <p className="leading-4 mb-1">
                    Users who provide funds to the liquidity pool are called
                    liquidity providers. They are incentivized to provide
                    liquidity to the pool through staking. By staking their
                    funds, liquidity providers earn a percentage of the trading
                    fees generated on the platform.
                    <br /> <br />
                    In addition to liquidity providers, users can also stake
                    $IT, the native token of the platform, and earn USDT from
                    the revenue generated through the TreasureIT programs AI
                    trading bot. Also, a portion of the platform's revenue is
                    used to buy back and burn $IT tokens.
                  </p>
                </div>
                <p className="text-sidebarText font-Lato font-medium text-sm">
                  Coming Soon
                </p>
              </div>
              {/* ICON PART */}
              <div className="w-[50px] mb-1">
                <img src={handCoin} alt="hatguy.svg" />
              </div>
            </div>
          </div>

          <div
            className="w-full lg:w-[49%] mt-5 border-grad p-[3px] 
        rounded-[24px] text-white font-Lato"
          >
            {/* THE INNER DIV THAT  HAS THE CONTENTS */}
            <div
              className="w-full h-full flex items-end 
          justify-between rounded-[22px] py-7 px-8 bg-sidebar"
            >
              <div className="flex flex-col items-start">
                <h2
                  className="text-[28px] 2xl:text-3xl 
              whitespace-nowrap font-medium -mb-3 font-Mont"
                >
                  Passive Income
                </h2>
                <div className={`my-5`}>
                  <p className="leading-4 mb-1">
                    An AI CEX Trading bot will be utilised by the project's
                    treasury, executing trades on multiple centralized
                    exchanges. Stakers are intoduced to an alternative source of
                    passive income through this strategy.
                    <br /> <br /> The bot opens leverage trading positions on
                    different centralized exchanges and 60% of profit
                    accumulated is distributed to $IT stakers (Rewards
                    distributed in USDT ). The remaining 40% is used to amplify
                    the trading position of the bot.
                  </p>
                </div>
                <p className="text-sidebarText font-Lato font-medium text-sm">
                  Coming Soon
                </p>
              </div>
              {/* ICON PART */}
              <div className="w-[50px] mb-1">
                <img src={handCoin} alt="hatguy.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
