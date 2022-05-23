import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const stocksUrl = `${corsProxy}https://query1.finance.yahoo.com/v8/finance/chart/GME`;
async function getStocks() {
  const response = await fetch(stocksUrl);
  return response.json();
}

function App() {
const [price, setPrice] = useState(-1);

  useEffect(() => {
    let timeoutId;
    async function getLatestPrice() {
      console.log('calling...');
      const data = await getStocks();
      const stock = data.chart.result[0];
      setPrice(stock.meta.regularMarketPrice.toFixed(2));
      timeoutId = setTimeout(getLatestPrice,5000);
    }

    timeoutId = setTimeout(getLatestPrice,2000);

    //disposale function
    return () => {
      clearTimeout(timeoutId);
    };
  },[]);

  return (
    <div className="price">
      {price}
    </div>
  );
}

export default App;
