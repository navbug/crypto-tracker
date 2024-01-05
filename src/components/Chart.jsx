import axios from "axios";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../context/CryptoContext";
import { numWithCommas } from "../pages/Home";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //x axis
  LinearScale, //y axis
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const graphDays = [
  {
    label: "24H",
    value: 1,
  },
  {
    label: "1W",
    value: 7,
  },
  {
    label: "1M",
    value: 30,
  },
  {
    label: "3M",
    value: 90,
  },
  {
    label: "6M",
    value: 180,
  },
  {
    label: "1Y",
    value: 365,
  },
];

const Chart = ({ id, coinData }) => {
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(365);
  const { currency, symbol } = CryptoState();

  const fetchChartData = async () => {
    const { data } = await axios.get(HistoricalChart(id, days, currency));
    setChartData(data.prices);
    console.log(data);
  };

  useEffect(() => {
    fetchChartData();
    console.log(chartData);
  }, [days]);

  console.log("chart");

  return (
    <div className="w-[75vw] md:w-full flex justify-center items-center">
      {!chartData.length > 0 ? (
        <div className="flex justify-center items-center w-full h-80">
          <div className="loading text-3xl" />
        </div>
      ) : (
        <div className="w-full flex flex-col pl-4 mr-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="pl-4 flex">
                <div>
                  <img className="w-7" src={coinData?.image?.large} alt="" />
                </div>
                <div className="flex flex-col">
                  <span className="pl-2 text-md font-semibold">{`${
                    coinData?.name
                  } ${coinData?.symbol.toUpperCase()}`}</span>
                </div>
              </div>
              <span className="pl-12 pb-4 text-lg font-semibold">{`${symbol} ${coinData?.market_data?.current_price?.inr}`}</span>
            </div>
            <div>
              {graphDays.map((day) => (
                <button
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  className="btn btn-ghost btn-xs"
                  style={{
                    backgroundColor:
                      days === day.value
                        ? "rgb(85, 182, 200)"
                        : "transparent",
                    color:
                      days === day.value
                        ? "white"
                        : "rgb(85, 182, 200)",
                  }}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
          <Line
            className="cursor-pointer"
            data={{
              labels: chartData?.map((coin) => {
                let date = new Date(coin[0]);
                const monthNames = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];
                let time = date.getHours() > 12 ?
                  `${date.getHours() - 12}:${date.getMinutes()} PM` :
                  `${date.getHours()}:${date.getMinutes()} AM`;
                const formattedDate = `${
                  monthNames[date.getMonth()]
                } ${date.getDate()}`;
                return days <= 7 ? time : formattedDate;
              }),
              datasets: [
                {
                  label: `${days} days prices`,
                  data: chartData?.map((coin) => coin[1]),
                  fill: false,
                  backgroundColor: "aqua",
                  pointBorderColor: "rgb(85, 182, 200)",
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
            options={{
              plugins: {
                legend: true,
              },
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Chart;
