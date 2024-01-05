import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinOverview from "../components/CoinOverview";
import CoinInfo from "../components/CoinInfo";
import { CryptoState } from "../context/CryptoContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const {user, setWatchlist, setPageChange} = CryptoState();
  console.log("coindetails");

  useEffect(() => {
    const fetchCoinData = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
      console.log(data);
    };
    fetchCoinData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-around items-center md:flex-row gap-4 mt-8 p-4">
        <div className="flex-1">
          <Chart id={id} coinData={coin} />
        </div>
        <div className="flex-1">
          <CoinOverview id={id} coin={coin} />
        </div>
      </div>
      <CoinInfo id={id} coin={coin} />
    </>
  );
};

export default CoinDetails;
