import React, { useEffect, useRef, useState } from "react";
import PrevIcon from "../assets/prev_icon.svg";
import NextIcon from "../assets/next_icon.svg";

const ContentSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const content = [
    {
      id: 1,
      title: "Social Trading",
      description:
        "Social trading: Replicate successful traders, learn from a collaborative community, and improve investment performance in a transparent environment.",
    },
    {
      id: 2,
      title: "Built-in Analytics",
      description:
        "Built-in analytics provides integrated data analysis tools, offering insights and performance metrics to optimize decision-making and enhance business strategies.",
    },
    {
      id: 3,
      title: "Earn by copy trading",
      description:
        "Earn by copy trading: Profit by mirroring successful traders, leveraging expertise for potential investment gains.",
    },
    {
      id: 4,
      title: "Stock trading API.",
      description:
        "Stock trading API: Real-time market data and trade execution for seamless stock trading integration and custom application development.",
    },
    {
      id: 5,
      title: "Smart order routing",
      description:
        "Smart order routing: Automated system intelligently routes orders across multiple liquidity sources to optimize execution quality and minimize trading costs.",
    },
    // Add more content items as needed
  ];

  const renderContent = () => {
    const itemsToShow = content.slice(currentIndex, currentIndex + 2);

    return itemsToShow.map((item) => (
      <div
        key={item.id}
        className="w-full h-[200px] overflow-y-hidden 
        border-grad p-[3px] rounded-[24px]"
      >
        <div
          className="w-full h-full overflow-y-scroll text-center 
           rounded-[22px] p-2 bg-sidebar text-white"
        >
          <p className={`font-Mont font-bold md:text-[28px] mb-5`}>
            {item.title}
          </p>
          <p className={`font-Lato md:text-[18px]`}>{item.description}</p>
        </div>
      </div>
    ));
  };

  const renderLargeContent = () => {
    const itemsToShow = content.slice(currentIndex, currentIndex + 2);

    return itemsToShow.map((item) => (
      <div key={item.id} className="w-full border-grad p-[3px] rounded-[24px]">
        <div
          className="w-full h-full text-center 
           rounded-[22px] py-7 px-8 bg-sidebar text-white"
        >
          <p className={`font-Mont font-bold text-[28px] mb-5`}>{item.title}</p>
          <p className={`font-Lato text-[18px]`}>{item.description}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="mx-auto p-4 flex items-center w-full">
      <button
        className={`p-2 bg-transparent text-white rounded ${
          currentIndex === 0 && "opacity-50 cursor-not-allowed"
        }`}
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <img src={PrevIcon} alt="" />
      </button>

      <div className="flex overflow-x-auto gap-4 scrollbar-hide w-full md:hidden">
        {renderContent()}
      </div>

      <div className="md:flex overflow-x-auto gap-4 scrollbar-hide w-full hidden">
        {renderLargeContent()}
      </div>

      <button
        className={`p-2 bg-transparent text-white rounded ${
          currentIndex >= content.length - 2 && "opacity-50 cursor-not-allowed"
        }`}
        onClick={nextSlide}
        disabled={currentIndex >= content.length - 2}
      >
        <img src={NextIcon} alt="" />
      </button>
    </div>
  );
};

export default ContentSlider;
