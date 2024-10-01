import css from '../styles/Details.module.css'

export const TickerTable = ({setUpdate, historicalData}) => {
    if (historicalData&&historicalData.length>0)
      {
    let temphistoricalData= [...historicalData].reverse();
    const markup=temphistoricalData.map((data, index) => (
      <tr  key={index}>
          <th className={css.dateDiv} scope='col'>{data.date === 'NA' ? '--' : data.date}</th>
          <td className={css.dataDiv} >{data.open === 'NA' ? '--' : data.open}</td>
          <td className={css.dataDiv} >{data.close === 'NA' ? '--' : data.close}</td>
          <td className={css.dataDiv} >{data.high === 'NA' ? '--' : data.high}</td>
          <td className={css.dataDiv} >{data.low === 'NA' ? '--' : data.low}</td> 
          <td className={css.dataDiv} >{data.volume === 'NA' ? '--' : data.volume}</td>
      </tr>       
    ));
    return(
      <table>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Open</th>
            <th scope="col">Close</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>
        <tbody>
         {markup}
        </tbody>

      </table>

    )
    } else{
      setUpdate(true)
    }
  };