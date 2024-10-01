import css from '../styles/Currency.module.css'

export const CurrencyTable =({liveList})=> {
    if (liveList.length>0){
        const markup =   liveList.map((data)=>
            <tr key={data.code}>
                <th>
                    {data.Name}
                    <br />
                    {data.code}
                </th>
                <td>
                    {data.change}
                    <br/>
                    {data.change_p} %
                </td>
                <td>{data.close}</td>
                <td>{data.previousClose}</td>
                <td>{data.open}</td>
                <td>{data.high}</td>   
                <td>{data.low}</td>
                <td>{data.timestamp}</td>        
            </tr>
            )
    return(
        <table>
        <thead>
          <tr>
            <th scope="rowgroup">Currency</th>
            <th scope="col">Change</th>
            <th scope="col">Close</th>
            <th scope="col">Previus Close</th>
            <th scope="col">Open</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
         {markup}
        </tbody>
      </table>
  
)}}