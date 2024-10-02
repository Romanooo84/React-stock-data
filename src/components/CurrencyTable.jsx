import {useMemo, useState, useEffect} from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import css from '../styles/CurrencyTable.module.css'

export const CurrencyTable = ({ liveList }) => {
  const [list, setList] = useState(liveList);
  const [sortedButton, setSortedButton]=useState(null)
  const [sortType, setSortType]=useState('SortUp')
  const [sortIcon, setSortIcon]=useState(<TiArrowSortedDown  className={css.icon}/>)

  useEffect(() => {
    setList(liveList); 
  }, [liveList]);

  const keyList = useMemo(() => {
    return ['change', 'change_p', 'close', 'high', 'low', 'open', 'previousClose', 'timestamp'];
  }, []);

  const sortData = (e) => {
    const buttonName = e.target.parentNode.id
    let sortType = e.target.parentNode.name
    setSortedButton(buttonName)
    let sortedList
    sortedList = [...list].map(item => ({
      ...item,
      [buttonName]: item[buttonName] === 'NA' ? 0 : Number(item[buttonName])
    }));
    if (sortType=== 'SortUp'){
              sortedList= sortedList.sort((a, b) => b[buttonName] - a[buttonName])
              setSortIcon(<TiArrowSortedDown  className={css.icon}/>)
              sortType='SortDown'
              setSortType(sortType)
            }else if (sortType=== 'SortDown'){
              sortedList = sortedList.sort((a, b) => a[buttonName] - b[buttonName])
              setSortIcon(<TiArrowSortedUp className={css.icon}/>)
              sortType='SortUp'
              setSortType(sortType)        
            }
    
    setList(sortedList);
  };

  const renderCell = (data) => {
    return data === 'NaN' ? 0 : data 
  };

  const dataCells = 
    list.map((data) => (
      <tr key={data.code}>
        <th className={css.nameCells}>
          <p className={css.paragraph}>{data.Name}</p>
          <p className={css.paragraphBottom}>{data.code}</p>
        </th>
        <td className={data.change<=0?`${css.dataCells} ${css.red}`:`${css.dataCells} ${css.green}`}>{renderCell(parseFloat(data.change).toFixed(4))}</td>
        <td className={data.change<=0?`${css.dataCells} ${css.red}`:`${css.dataCells} ${css.green}`}>{renderCell(parseFloat(data.change_p).toFixed(2))} %</td>
        <td className={css.dataCells}>{renderCell(parseFloat(data.close).toFixed(4))}</td>
        <td className={css.dataCells}>{renderCell(parseFloat(data.previousClose).toFixed(2))}</td>
        <td className={css.dataCells}>{renderCell(parseFloat(data.open).toFixed(4))}</td>
        <td className={css.dataCells}>{renderCell(parseFloat(data.high).toFixed(4))}</td>
        <td className={css.dataCells}>{renderCell(parseFloat(data.low).toFixed(4))}</td>
        <td className={css.dataCells}>{renderCell(data.timestamp)}</td>
      </tr>
    ));

    const tableLabels =  keyList.map((key) => {
      return (
        <th scope="col" key={key+1000}>
          <div className={css.thLabel}>
          {key === 'change_p' ? 'change %' : key}
          <button className={css.button} id={key} name={sortType} onClick={sortData}>
          {sortedButton === key ? sortIcon : <TiArrowSortedUp className={css.icon}/>}
          </button>
          </div>
        </th>
      );
    });
   
  return (
    <table>
      <thead>
        <tr>
          <th scope="rowgroup">Currency</th>
          {tableLabels}
        </tr>
      </thead>
      <tbody>{dataCells}</tbody>
    </table>
  );
};
