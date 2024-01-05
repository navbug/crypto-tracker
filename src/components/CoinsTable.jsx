import React, { useEffect, useState } from "react";
import { FaChevronRight, FaStar, FaRegStar} from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { FaChevronLeft } from "react-icons/fa";
import { CryptoState } from "../context/CryptoContext";
import { useNavigate } from "react-router-dom";
import { numWithCommas } from "../pages/Home";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [coin, setCoin] = useState();
  const { user, currency, symbol, fetchCoins, coins, loading, watchlist } = CryptoState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoins();
    console.log(coins);
  }, [currency]);

  // const inWatchlist = watchlist.includes(coins.map(c => c.id));

  const addCoinToWatchlist = async (coin) => {
    console.log(coins);
    console.log(coin);
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });
    } catch (error) {
      console.log(error);
    }
  }

  const filteredCoins = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <>
      <div className="navbar bg-base-100 mt-6">
        <div className="flex-1 mb-2">
          <a className="font-bold text-2xl">Crypto prices</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search coin..."
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-80">
            <div className="loading" />
          </div>
        ) : (
          <table className="table">
            <thead className="text-md">
              <tr>
                <th></th>
                <th className="text-lg">Coin</th>
                <th className="text-lg text-end">Price</th>
                <th className="text-lg text-end hidden md:table-cell">24h Change</th>
                <th className="text-lg text-end hidden md:table-cell">Market Cap</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins()
                .slice(10 * page - 10, 10 * page)
                .map((coin, index) => {
                  return (
                    <tr onClick={() => {
                      navigate(`/coins/${coin.id}`);
                      window.location.reload();
                    }} key={coin.name} className="hover cursor-pointer">
                      <th className="text-xl" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addCoinToWatchlist(coin);
                      }}>
                        <span className="tooltip tooltip-right" data-tip="Add to Watchlist" ><FaStar/></span>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={coin?.image} alt={coin?.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {coin?.symbol.toUpperCase()}
                            </div>
                            <div className="text-sm opacity-50">
                              {coin?.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-md text-end">
                        <span className="font-semibold">
                          {symbol}
                          {numWithCommas(coin.current_price.toFixed(2))}
                        </span>
                      </td>
                      <td
                        className={`text-md text-end hidden md:table-cell ${
                          coin.price_change_percentage_24h < 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {`${coin.price_change_percentage_24h.toFixed(2)}%`}
                      </td>
                      <td className="text-md text-end hidden md:table-cell">{symbol}{numWithCommas((coin.market_cap/10000000).toFixed(0))}Cr</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}

        {!loading && <div className="flex justify-center m-6">
          <ReactPaginate
            nextLabel={<FaChevronRight />}
            onPageChange={(e) => {
              setPage(e.selected + 1);
              window.scroll(0, 120);
            }}
            pageCount={(filteredCoins()?.length / 10).toFixed(0)}
            previousLabel={<FaChevronLeft />}
            containerClassName="join"
            pageClassName="join-item btn"
            // pageLinkClassName="btn"
            previousClassName="join-item btn"
            // previousLinkClassName="join-item btn"
            nextClassName="join-item btn"
            // nextLinkClassName="join-item btn"
            activeClassName="checked btn-active"
          />
        </div>}
      </div>
    </>
  );
};

export default CoinsTable;
