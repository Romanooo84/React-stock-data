import { useMemo, useState, useEffect } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import css from '../styles/CurrencyTable.module.css';

export const CurrencyTable = ({ liveList, setIsSorting, setTickerList, isSorting }) => {
  const [list, setList] = useState(liveList);
  const [sortedButton, setSortedButton] = useState(null);
  const [sortType, setSortType] = useState('SortUp');
  const [sortIcon, setSortIcon] = useState(<TiArrowSortedDown className={css.icon} />);
  const [animationKey, setAnimationKey] = useState(0);
  const [intervalCounter, setIntervalCounter]=useState(0)

  useEffect(() => {
    setList(liveList);
  }, [liveList]);

  const keyList = useMemo(() => {
    return ['change', 'change_p', 'close', 'previousClose', 'open', 'high', 'low'];
  }, []);

  const sortData = (e) => {
    setIsSorting(true)
    const buttonName = e.currentTarget.id;
    let sortType = e.currentTarget.name;
    let sortedList;
    
    setSortedButton(buttonName);
    sortedList = [...list].map(item => ({
      ...item,
      [buttonName]: item[buttonName] === 'NA' ? 0.0000 : Number(item[buttonName]),
    }));
    if (sortType === 'SortUp') {
      sortedList = sortedList.sort((a, b) => b[buttonName] - a[buttonName]);
      setSortIcon(<TiArrowSortedDown className={css.icon} />);
      sortType = 'SortDown';
    } else if (sortType === 'SortDown') {
      sortedList = sortedList.sort((a, b) => a[buttonName] - b[buttonName]);
      setSortIcon(<TiArrowSortedUp className={css.icon} />);
      sortType = 'SortUp';
    }
    let tempTickerList=sortedList.map((ticker)=>ticker.code)
    setTickerList(tempTickerList)
    setSortType(sortType);
    setAnimationKey(prevKey => prevKey + 1);
    setList(sortedList);
    setIntervalCounter(prevValue => prevValue + 1)
    const timer = setTimeout(() => {
      intervalCounter ===0 && setIsSorting(false)
      setIntervalCounter(prevValue => prevValue - 1)
    }, 20000); 
    return () => {clearTimeout(timer);
    }
  };

  const renderCell = (data) => {
    return data === 'NaN' ? 0.0000 : data;
  };

  const dataCells = list.map((data) => (
    <tr key={`${data.code}-${animationKey}`} className={css.dataRow}>
      <th className={css.nameCells}>
        <p className={css.paragraph}>{data.Name}</p>
        <p className={css.paragraphBottom}>{data.code}</p>
      </th>
      <td className={data.change <= 0 ? `${css.dataCells} ${css.red}` : `${css.dataCells} ${css.green}`}>
        <p className={css.thParagraph}>{renderCell(parseFloat(data.change).toFixed(4))}</p>
      </td>
      <td className={data.change <= 0 ? `${css.dataCells} ${css.red}` : `${css.dataCells} ${css.green}`}>
        <p className={css.thParagraph}>{renderCell(parseFloat(data.change_p).toFixed(2))} %</p>
      </td>
      <td className={css.dataCells}>
        <p className={css.thParagraph}>{renderCell(parseFloat(data.close).toFixed(4))}</p>
      </td>
      <td className={css.dataCells}>
        <p className={css.thParagraph}>{renderCell(parseFloat(data.previousClose).toFixed(2))}</p>
      </td>
      <td className={css.dataCells}>
        <p className={css.thParagraph}>{renderCell(parseFloat(data.open).toFixed(4))}</p>
      </td>
      <td className={css.dataCells}>
        <p className={css.thParagraph}>{renderCell(parseFloat(data.high).toFixed(4))}</p>
      </td>
      <td className={css.dataCells}>
        <p className={css.thParagraph}>{renderCell(parseFloat(data.low).toFixed(4))}</p>
      </td>
    </tr>
  ));

  const tableLabels = keyList.map((key) => {
    return (
      <th scope="col" key={key + 1}>
        <div className={css.thLabel}>
          {key === 'change_p' ? 'change %' : key === 'previousClose' ? 'prev close' : key}
          <button className={css.button} id={key} name={sortType} onClick={sortData}>
            {sortedButton === key ? sortIcon : <TiArrowSortedUp className={css.icon} />}
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
