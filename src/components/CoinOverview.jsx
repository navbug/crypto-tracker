import React from "react";

const CoinOverview = ({ id, coin }) => {
  console.log(coin);

  return (
    <div>
      <div className="card rounded-sm w-[17rem] glass">
        <div className="card-body p-3 text-[.8rem]">
          <h2 className="card-title mb-4">Overview</h2>
            <p className="flex justify-between">
              Market cap:{" "}
              <span className="font-bold">
                {coin?.market_data?.market_cap?.inr}
              </span>
            </p>
          <hr></hr>
          <p className="flex justify-between">
            24h high:{" "}
            <span className="font-bold">
              {coin?.market_data?.high_24h?.inr}
            </span>
          </p>
          <hr></hr>
          <p className="flex justify-between">
            24h low:{" "}
            <span className="font-bold">{coin?.market_data?.low_24h?.inr}</span>
          </p>
          <hr></hr>
          <p className="flex justify-between">
            Circulating Supply:{" "}
            <span className="font-bold">
              {coin?.market_data?.circulating_supply}
            </span>
          </p>
          <hr></hr>
          <p className="flex justify-between">
            Total volume:{" "}
            <span className="font-bold">
              {coin?.market_data?.total_volume?.inr}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinOverview;
