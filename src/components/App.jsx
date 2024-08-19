import {multiplyData} from '../hooks/downloadData'
import { Header } from './Header';
import { useState, useEffect } from 'react';

export const App = () => {

  const data = ['AAPL.US', 'EUR.FOREX']
  const [multiplyList, setMultiplyList] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const result = await multiplyData(data);
      console.log(result);
    };
  
    fetchData();
  }, [data]);
  return (
    <div>
    <Header multiplyData={multiplyData}/>
    </div>
  );
};
