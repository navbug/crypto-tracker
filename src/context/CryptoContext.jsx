import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select"
import { CoinList } from "../config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("inr");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const [pageChange, setPageChange] = useState(false);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if(user) {
      const coinRef = doc(db, "watchlist", user.uid);
      let unsubscribe = onSnapshot(coinRef, (coin) => {
        if(coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });
      return () => {
        unsubscribe();
      }
    }
  }, [user, pageChange]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  });

  useEffect(() => {
    if (currency === "inr") {
      setSymbol("₹");
    } else if (currency === "usd") {
      setSymbol("$");
    }
    console.log(currency);
  }, [currency]);

  return <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins, user, watchlist, setWatchlist, pageChange, setPageChange }}>{children}</Crypto.Provider>;
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
}