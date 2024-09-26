import { useData } from 'hooks/dataContext';
import { useEffect, useState, useMemo } from "react";
import { createDate } from "hooks/createDate";
import { Datepicker } from '@mobiscroll/react';
import { historicalData as functionHistoricalData} from "hooks/downloadData";
import tickers from '../data/ticers'
import Select from 'react-select';
import css from '../styles/Details.module.css'

export const Details = () => {
  const { Data, updateData} = useData();
  const {historicalData}=Data
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [update, setUpdate] = useState(false)


  const TickerTable = ({historicalData}) => {
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


  const customStyles = useMemo(() => ({
    control: (provided, state) => ({
        ...provided,
        minHeight: 10,
        borderTop: 'none',
        borderBottom: '3px solid transparent',
        borderLeft: '0px solid transparent',
        borderRight: '0px solid transparent',
        boxShadow: state.isFocused ? 'none' : 'none', 
        transition: `border-color 1.25s, transform 1s`,

        '&:hover': {
            borderBottom: '3px solid blue',
        },
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        display: 'none' 
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none'
    })
}), []);

const onChange = (selectedOption) => {
  const tempChartName = selectedOption.label.split('-')[1]
  updateData({
  ticker:selectedOption.value,
  tickerName: selectedOption.label,
  chartName:tempChartName ,
 })
 setUpdate(true)
}

const onDateChange = (selectedOption) => {
  const startDate=createDate(selectedOption.value[0])
  const endDate = createDate(selectedOption.value[1])
  updateData({
      startDate,
      endDate
  })
  setUpdate(true)
}

const onInputChange = (event) => {
  setSearch(event.toLowerCase())
}

useEffect(() => {
  if(search&&search.length>0){
      setSearchTerm(search)
  }else if (search&&search.length===0){
      setSearchTerm(search)
  }
}, [search])

useEffect(() => {
  if (search.length > 2) {
      const results = tickers.filter(item =>
          item.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          item.Type !== 'ETF' &&
          item.Type !== 'FUND' &&
          item.Type !== 'BOND' &&
          item.Type !== 'Mutual Fund'
      );

      const newOptions = results.map(item => ({
          value: item.Country === 'USA' ? `${item.Code}.US` : `${item.Code}.${item.Exchange}`,
          label: `${item.Code} - ${item.Name}`
      }));

      setOptions(newOptions);
  }
}, [search, searchTerm]);

useEffect(() => {
  if (update===true){
      functionHistoricalData(Data.ticker, Data.startDate, Data.endDate)
          .then(data => {
              if (data) {
                      setUpdate(false)
                      updateData({
                        historicalData:data,
                        })
                    }
                  });
              }}, [Data.endDate, Data.startDate, historicalData, updateData, Data.ticker, update]);


  return (
    <div className={css.details}>
       <div className={css.inputDiv}>
       <Select className={css.slect} styles={customStyles} noOptionsMessage={() => options.length < 1 ? 'Enter at least 3 characters' : 'No options available'} placeholder={Data.ticker} value={{ label: `${Data.ticker} - ${Data.chartName}`, value: Data.ticker }} name={Data.ticker} options={options} onChange={onChange} onInputChange={onInputChange} />
       <Datepicker className={css.datepicker}  onChange={onDateChange} placeholder={`${Data.startDate} - ${Data.endDate}`}controls={['calendar']} select="range" touchUi={true} inputComponent="input" inputProps={{ id: 'startDate' }} max={new Date()}/>   
       </div>
      <TickerTable historicalData={historicalData}/>
    </div>
  );
};