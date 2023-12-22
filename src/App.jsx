import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import CoinDetails from './pages/CoinDetails'
import Navbar from './components/Navbar';

function App() {

  return (
    <div className='max-w-4xl mx-auto'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins/:id" element={<CoinDetails />} />
      </Routes>
    </div>
  )
}

export default App
