import React, { useState } from "react";
import ReactSelect from "react-select";
import { CryptoState } from "../context/CryptoContext";

import Watchlist from "./Watchlist";
import Auth from "./Auth";

const Navbar = () => {
  const { user } = CryptoState();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="link no-underline ml-5 text-xl font-bold" href="/">
          CryptoTracker
        </a>
      </div>
      <div className="flex-none">
        {user && <div className="font-bold mr-2">User: <span className="italic font-normal">{user.email}</span></div>}
        {user ? (
          <Watchlist />
        ) : (
          <Auth />
        )}
      </div>
    </div>
  );
};

export default Navbar;
