import React from 'react'
import CoinsTable from '../components/CoinsTable'
import GeneralInfo from '../components/GeneralInfo';

export function numWithCommas(number) {
  number = number.toString();
  number = number.split(".");
  return number[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") + (number[1] ? ("."+number[1]): "");
}

const Home = () => {
  return (
    <div>
      <GeneralInfo />
      <CoinsTable />
    </div>
  )
}

export default Home