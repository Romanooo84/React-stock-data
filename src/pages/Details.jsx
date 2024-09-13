import { TickerData } from 'components/TickerData';
import { useData } from 'hooks/dataContext';

export const Details = () => {
  const { Data } = useData();
  const {historicalData, liveData, endDate}=Data

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