import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CoinDetails from "./pages/CoinDetails";
import Navbar from "./components/Navbar";
import NoInternetConnection from "./components/NoInternetConnection";

function App() {
  return (
    <div className="max-w-4xl mx-auto">
      <NoInternetConnection>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<CoinDetails />} />
        </Routes>
      </NoInternetConnection>
    </div>
  );
}

export default App;
