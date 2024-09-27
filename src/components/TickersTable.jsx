import css from '../styles/Details.module.css'

export const TickerTable = ({setUpdate, historicalData}) => {
    if (historicalData&&historicalData.length>0)
      {
    let temphistoricalData= [...historicalData].reverse();
    const markup=temphistoricalData.map((data, index) => (
      <div className={css.mainDiv}key={index}>
        <div className={css.dateDiv}>
          <p>Date: </p>
          <p>{data.date}</p>
        </div>
        <div className={css.dataDiv}>
          <div className={css.partDataDiv}>
            <p>Open: </p>
            <p>{data.open}</p>
          </div>
          <div className={css.partDataDiv}>
            <p>Close: </p>
            <p>{data.close}</p>
          </div>
          <div className={css.partDataDiv}>
            <p>High: </p>
            <p>{data.high}</p>
          </div>
          <div className={css.partDataDiv}>
            <p>Low: </p>
            <p>{data.low}</p>
          </div>
          <div className={css.partDataDiv}>
            <p>Volume: </p>
            <p>{data.volume}</p>
          </div>
        </div>
        </div>
      
    ));
    return(markup)
    } else{
      setUpdate(true)
    }
  };