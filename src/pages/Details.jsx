import { TickerData } from 'components/TickerData';
import { useData } from 'hooks/dataContext';
import { useEffect } from 'react';

export const Details = () => {
  const { Data, updateData } = useData();
  const {historicalData, liveData, endDate}=Data
  useEffect(()=>{
    if (!Data.isDetailsOpen){
      updateData({
        isDetailsOpen: true,
      })
    }},[updateData, Data.isDetailsOpen])
  
  

  const TickerTable = (historicalData) => {
    if (historicalData.historicalData.length>0){
    const markup=historicalData.historicalData.map((data, index) => (
      <div key={index}>
        <p>Date: {data.date}</p>
        <p>Open: {data.open}</p>
        <p>Close: {data.close}</p>
        <p>High: {data.high}</p>
        <p>Low: {data.low}</p>
        <p>Volume: {data.volume}</p>
      </div>
    ));
    return(markup)
    }
  };

  


  return (
    <div>
      <h1>Details Page</h1>
      <TickerData downloadedHistoricalData={historicalData} downloadedLiveData={liveData} endDate={endDate} />
      <TickerTable historicalData={historicalData}/>
    </div>
  );
};