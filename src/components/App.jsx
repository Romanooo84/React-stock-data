import { multiplyData } from '../hooks/downloadData';
import { Header } from './Header';
import { useState, useEffect } from 'react';

export const App = () => {
  const data = ['AAPL.US', 'EUR.FOREX'];
  const [multiplyList, setMultiplyList] = useState([]);

  useEffect(() => {
    multiplyData(data)
      .then(downloadedData => {
        if (downloadedData) {
          setMultiplyList(downloadedData); // Set the state with the fetched data
          console.log(multiplyList)
        }
      });
  }, []);

  return (
    <div>
      <Header multiplyData={multiplyData} />
      {/* You can use multiplyList here if needed */}
    </div>
  );
};