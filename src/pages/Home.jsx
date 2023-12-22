import React from 'react'
import Carousel from '../components/Carousel'
import CoinsTable from '../components/CoinsTable'

export function numWithCommas(number) {
  number = number.split(".");
  return number[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") + (number[1] ? ("."+number[1]): "");
}

const Home = () => {
  return (
    <div>
      <Carousel />
      <CoinsTable />
    </div>
  )
}

export default Home