import {useMemo, useState, useEffect} from "react";
import css from '../styles/CurrencyTable.module.css'

export const CurrencyTable = ({ liveList }) => {
  const [list, setList] = useState(liveList);
  const [sortedButton, setSortedButton]=useState(null)
  const [sortType, setSortType]=useState('SortUp')

  useEffect(() => {
    setList(liveList); 
  }, [liveList]);

  const keyList = useMemo(() => {
    return ['change', 'change_p', 'close', 'high', 'low', 'open', 'previousClose', 'timestamp'];
  }, []);

  const sortData = (e) => {
    const buttonName = e.target.name;
    const sortType = e.target.textContent
    setSortedButton(buttonName)
    let sortedList
    sortedList = [...list].map(item => ({
      ...item,
      [buttonName]: item[buttonName] === 'NA' ? 0 : Number(item[buttonName])
    }));

    if (sortType=== 'SortUp'){
              sortedList= sortedList.sort((a, b) => b[buttonName] - a[buttonName])
              setSortType('SortDown')
            }else{
              sortedList = sortedList.sort((a, b) => a[buttonName] - b[buttonName])
              setSortType('SortUp')
            }
    setList(sortedList);
  };

  const renderCell = (data) => {
    return data === 'NA' ? 0 : data;
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
        <th scope="col" key={key}>
          <div className={css.thLabel}>
          {key === 'change_p' ? 'change %' : key}
          <button name={key} onClick={sortData}>
          {sortedButton === key ? sortType : 'SortUp'}
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
