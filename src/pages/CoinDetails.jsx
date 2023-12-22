import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinOverview from "../components/CoinOverview";
import CoinInfo from "../components/CoinInfo";

const CoinDetails = () => {
  const {id} = useParams();
  const [coin, setCoin] = useState();

  const fetchCoinData = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    console.log(data);
  };

  useEffect(() => {
    fetchCoinData();
  }, [coin]);

  return (
    <>
    <div className="flex justify-between mt-8">
      <Chart id={id} coinData={coin}/>
      <CoinOverview id={id} coin={coin}/>
    </div>
      <CoinInfo id={id} coin={coin}/>
      </>
  );
};

export default CoinDetails;