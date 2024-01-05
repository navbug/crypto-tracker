import React from "react";

const CoinOverview = ({ id, coin }) => {
  console.log(coin);

  return (
    <div>
      <div className="card rounded-sm w-[80vw] md:w-[25vw] mt-6 md:m-0 h-[15rem] glass">
        {coin?.id ? <div className="card-body p-3 text-[.8rem]">
          <h2 className="card-title mb-4">Overview</h2>
            <p className="flex justify-between">
              Market cap:{" "}
              <span className="font-bold">
                {`${(coin?.market_data?.market_cap?.inr / 10000000).toFixed(0)}Cr.`}
              </span>
            </p>
          <hr></hr>
          <p className="flex justify-between">
            24h high:{" "}
            <span className="font-bold">
              {`${(coin?.market_data?.high_24h?.inr / 100000).toFixed(2)}l`}
            </span>
          </p>
          <hr></hr>
          <p className="flex justify-between">
            24h low:{" "}
            <span className="font-bold">{`${(coin?.market_data?.low_24h?.inr / 100000).toFixed(2)}l`}</span>
          </p>
          <hr></hr>
          <p className="flex justify-between">
            Circulating Supply:{" "}
            <span className="font-bold">
              {`${(coin?.market_data?.circulating_supply / 10000000).toFixed(2)}Cr.`}
            </span>
          </p>
          <hr></hr>
          <p className="flex justify-between">
            Total volume:{" "}
            <span className="font-bold">
              {`${(coin?.market_data?.total_volume?.inr / 10000000).toFixed(0)}Cr.`}
            </span>
          </p>
        </div> : <div className="flex justify-center items-center h-[15rem]"><span className="loading"></span></div>}
      </div>
    </div>
  );
};

export default CoinOverview;