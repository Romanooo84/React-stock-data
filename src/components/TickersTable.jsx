import css from '../styles/Details.module.css'

export const TickerTable = ({setUpdate, historicalData}) => {
    if (historicalData&&historicalData.length>0)
      {
    let temphistoricalData= [...historicalData].reverse();
    const markup=temphistoricalData.map((data, index) => (
      <tr  key={index}>
          <th className={css.dateDiv} scope='col'><p>{data.date === 'NA' ? '--' : data.date}</p></th>
          <td className={css.dataDiv} ><p className={css.thParagraph}>{data.open === 'NA' ? '--' : data.open}</p></td>
          <td className={css.dataDiv} ><p className={css.thParagraph}>{data.close === 'NA' ? '--' : data.close}</p></td>
          <td className={css.dataDiv} ><p className={css.thParagraph}>{data.high === 'NA' ? '--' : data.high}</p></td>
          <td className={css.dataDiv} ><p className={css.thParagraph}>{data.low === 'NA' ? '--' : data.low}</p></td> 
          <td className={css.dataDiv} ><p className={css.thParagraph}>{data.volume === 'NA' ? '--' : data.volume}</p></td>
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