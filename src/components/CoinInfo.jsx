import React from "react";

const CoinInfo = ({id, coin}) => {
  return (
    <div>
      <div className="card w-full bg-base-100 shadow-xl m-6">
  <div className="card-body">
    <h2 className="card-title underline">About {coin?.name}</h2>
    <p>{`${coin?.description?.en.slice(0, 700)}...`}</p>
    <div className="card-actions justify-end">
    </div>
  </div>
</div>
    </div>
  );
};

export default CoinInfo;
