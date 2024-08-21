import { multiplyData, getExchanges, getTickers } from '../hooks/downloadData';
import { Tickers } from './Tickers';
import { useState, useEffect } from 'react';

export const App = () => {
  const data = ['AAPL.US', 'EUR.FOREX'];
  const [multiplyList, setMultiplyList] = useState([]);

  useEffect(() => {
    multiplyData(data)
      .then(downloadedData => {
        if (downloadedData) {
          setMultiplyList(downloadedData);
        }
      });
  }, []);

  return (
    <div>
      <Tickers multiplyList={multiplyList} />
    </div>
  );
};