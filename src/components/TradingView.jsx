// TradingViewWidget.jsx

import React, { useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../context";

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();
  const { symbol } = useContext(GlobalContext);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_48a40") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          //   autosize: true,
          width: "100%",
          height: "100%",
          symbol: symbol,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#1d1d1d",
          enable_publishing: false,
          gridColor: "#4242422d",
          //   hide_top_toolbar: true,
          withdateranges: true,
          backgroundColor: "#1d1d1d",
          allow_symbol_change: true,
          container_id: "tradingview_48a40",
        });
      }
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_48a40" />
      <div className="tradingview-widget-copyright">
        {/* <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a> */}
      </div>
    </div>
  );
}
