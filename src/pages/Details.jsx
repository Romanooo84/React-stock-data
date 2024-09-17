import { TickerData } from 'components/TickerData';
import { useData } from 'hooks/dataContext';
import css from '../styles/Details.module.css'

export const Details = () => {
  const { Data} = useData();
  const {historicalData, liveData, endDate}=Data
 
  

  const TickerTable = ({historicalData}) => {
    if (historicalData.length>0){
    let temphistoricalData= [...historicalData].reverse();
    const markup=temphistoricalData.map((data, index) => (
      <div className={css.mainDiv}key={index}>
        <div className={css.dateDiv}>
          <p>Date: {data.date}</p>
        </div>
        <div className={css.dataDiv}>
          <p>Open: {data.open}</p>
          <p>Close: {data.close}</p>
          <p>High: {data.high}</p>
          <p>Low: {data.low}</p>
          <p>Volume: {data.volume}</p>
        </div>
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