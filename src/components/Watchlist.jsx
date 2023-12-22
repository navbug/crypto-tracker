import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CryptoState } from "../context/CryptoContext";
import { numWithCommas } from "../pages/Home";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Watchlist = () => {
  const [open, setOpen] = useState(true);
  const {watchlist, coins, symbol, user} = CryptoState();

  const removeCoinFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: "true" }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-outline btn-primary btn-sm rounded-btn text-lg"
        onClick={() => {
          setOpen(true);
          document.getElementById("modal").showModal();
        }}
      >
        Watchlist
      </button>
      {open && (
        <dialog id={`${open && "modal"}`} className="modal">
          <div className="modal-box card relative shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form method="dialog" className="absolute right-0 top-0">
              <button className="btn font-extrabold text-xl text-slate-500">
                X
              </button>
            </form>
            <div className="card">
              <div className="p-2">
                <h2 className="card-title">Watchlist</h2>
                <div className="divider"></div>
                <table className="table mt-2">
                  <tbody>
                  {watchlist.length > 0 ? (
                      <div>
                        {coins.map((coin, index) => {
                          if(watchlist.includes(coin.id)) {
                            return (<tr className="hover cursor-pointer">
                            <td>
                              <img
                                className="w-7"
                                src={coin?.image}
                                alt={coin?.name}
                              />
                            </td>
                            <td>{coin?.name}</td>
                            <td>{symbol}{numWithCommas(coin?.current_price.toFixed(2))}</td>
                            <td className="text-end" onClick={() => removeCoinFromWatchlist(coin)}>
                              <MdDeleteForever />
                            </td>
                          </tr>)
                          }
                        })}
                      </div>
                  ) : (
                    <p>No coins in watchlist</p>
                    )}
                    </tbody>
                </table>
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-danger btn-sm rounded-btn mt-4"
                  onClick={() => {
                    signOut(auth);
                    setOpen(false);
                    document.getElementById("modal").close();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Watchlist;
