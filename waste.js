<div className="w-[31%] border-grad rounded-[14px] p-[2px] ">
  <div className="bg-sidebar rounded-[12px] w-full overflow-hidden flex flex-col items-center">
    {/* MARKETS AND TRADE TIME */}
    <div className="w-full p-4 flex items-center justify-between font-Lato">
      <h4 className="text-gray-300 text-sm ">Market Trades</h4>
      <p className="text-sm text-inputText font-medium font-Lato">24H</p>
    </div>

    <table className="mt-5 text-gray-300 text-left w-full px-4 text-xs font-Lato mb-1">
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
          <td className="text-center tables-body text-inputText">5/7 14:55</td>
          <td className="text-right tables-body text-gray-500">26,839.9</td>
        </tr>
        <tr className="w-full ">
          <td className="text-left tables-body text-green">0.108349</td>
          <td className="text-center tables-body text-inputText">5/7 14:55</td>
          <td className="text-right tables-body text-gray-500">26,839.9</td>
        </tr>
        <tr className="w-full ">
          <td className="text-left tables-body text-green">0.108349</td>
          <td className="text-center tables-body text-inputText">5/7 14:55</td>
          <td className="text-right tables-body text-gray-500">26,839.9</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>;

<p
        onClick={() => {
          // navigate("/copytrading");
        }}
        className={`${
          location === "/copytrading" ? styles.menuTextHi : styles.comingSoon
        }`}
      >
        {/* Copytrading */}
        Coming Soon
      </p>

      <p
        onClick={() => {
          // navigate("/leaderboard");
        }}
        className={`${
          location === "/leaderboard" ? styles.menuTextHi : styles.comingSoon
        }`}
      >
        {/* Leaderboard */}
        Coming Soon
      </p>

      <p
        onClick={() => {
          // navigate("/trading-bot");
        }}
        className={`${
          location === "/trading-bot" ? styles.menuTextHi : styles.comingSoon
        }`}
      >
        {/* AI Trading Bot */}
        Coming Soon
      </p>

      <p
        onClick={() => {
          // navigate("/nft-marketplace");
        }}
        className={`${
          location === "/nft-marketplace"
            ? styles.menuTextHi
            : styles.comingSoon
        }`}
      >
        {/* NFT Marketplace */}
        Coming Soon
      </p>
