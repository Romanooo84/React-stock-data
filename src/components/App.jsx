import { multiplyData, getExchanges, getTickers } from '../hooks/downloadData';
import { Header } from './Header';
import { useState, useEffect } from 'react';

export const App = () => {
  const data = ['AAPL.US', 'EUR.FOREX'];
  const [multiplyList, setMultiplyList] = useState([]);

  getExchanges()

 /* useEffect(() => {
    getExchanges()
      .then(downloadedData => {
        if (downloadedData) {
          getTickers(downloadedData)
          .then(data=>console.log(data))
        }
      });
  }, []);*/

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
      <Header multiplyList={multiplyList} />
    </div>
  );
};