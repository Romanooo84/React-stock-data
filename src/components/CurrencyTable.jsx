import {useMemo, useState, useEffect} from "react";

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
    let sortedList
    setSortedButton(buttonName)

    if (sortType=== 'SortUp'){
              sortedList = [...list].sort((a, b) => b[buttonName] - a[buttonName])
              setSortType('SortDown')
            }else{
              sortedList = [...list].sort((a, b) => a[buttonName] - b[buttonName])
              setSortType('SortUp')
            }
    setList(sortedList);
  };

  const renderCell = (data, defaultValue = '--') => {
    return data === 'NA' ? defaultValue : data;
  };

  const dataCells = 
    list.map((data) => (
      <tr key={data.code}>
        <th>
          {data.Name}
          <br />
          {data.code}
        </th>
        <td>{renderCell(data.change)}</td>
        <td>{renderCell(data.change_p)} %</td>
        <td>{renderCell(data.close)}</td>
        <td>{renderCell(data.previousClose)}</td>
        <td>{renderCell(data.open)}</td>
        <td>{renderCell(data.high)}</td>
        <td>{renderCell(data.low)}</td>
        <td>{renderCell(data.timestamp)}</td>
      </tr>
    ));

    const tableLabels = () => keyList.map((key) => {
      return (
        <th scope="col" key={key}>
          {key === 'change_p' ? 'change %' : key}
          <button name={key} onClick={sortData}>
          {sortedButton === key ? sortType : 'SortUp'}
          </button>
        </th>
      );
    });
   
  return (
    <table>
      <thead>
        <tr>
          <th scope="rowgroup">Currency</th>
          {tableLabels()}
        </tr>
      </thead>
      <tbody>{dataCells}</tbody>
    </table>
  );
};
