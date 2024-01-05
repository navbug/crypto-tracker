import React from "react";
import { CryptoState } from "../context/CryptoContext";
import { numWithCommas } from "../pages/Home";

const GeneralInfo = () => {
  const {coins, symbol} = CryptoState();
  console.log(coins);

  return (
    <div>
      {coins.length ? <div className="navbar bg-base-100 mx-4 mt-2 font-semibold text-lg flex gap-2 flex-col-reverse md:flex-row md:justify-start">
        <div className="flex-1">
          <div>
            BTC market cap: <span className="text-blue-600">{symbol}{numWithCommas((coins[0]?.market_cap/10000000).toFixed(0))}Cr</span>
          </div>
        </div>
        <div className="flex-none mr-4">
          <div>
            BTC volume: <span className="text-blue-600 w-10">{symbol}{numWithCommas((coins[0]?.total_volume/10000000).toFixed(0))}Cr</span>
          </div>
        </div>
      </div> : <div className="flex justify-center items-center h-10"><span className="loading"></span></div>}
    </div>
  );
};

export default GeneralInfo;
