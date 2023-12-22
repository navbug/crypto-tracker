import React from "react";
import { CryptoState } from "../context/CryptoContext";
import { numWithCommas } from "../pages/Home";

const Carousel = () => {
  const {coins, symbol} = CryptoState();
  console.log(coins);

  return (
    <div>
      <div className="navbar bg-base-100 mx-4 font-semibold text-lg">
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
      </div>
    </div>
  );
};

export default Carousel;
