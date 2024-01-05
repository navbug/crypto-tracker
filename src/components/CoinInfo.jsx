import React from "react";

const CoinInfo = ({ id, coin }) => {
  console.log("coininfo");
  return (
    <div>
      <div className="card w-full bg-base-100 shadow-xl m-auto p-5">
        {coin?.id ? <div className="card-body">
          <h2 className="card-title underline">About {coin?.name}</h2>
          <p>
            {coin?.description && `${coin?.description?.en.slice(0, 700)}...`}
          </p>
          <div className="card-actions justify-end"></div>
        </div> : <div className="flex justify-center items-center h-80"><span className="loading"></span></div>}
      </div>
    </div>
  );
};

export default CoinInfo;
