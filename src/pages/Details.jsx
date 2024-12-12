import { useData } from 'hooks/dataContext';
import { useEffect, useState} from "react";
import { createDate } from "hooks/createDate";
import { historicalData as functionHistoricalData} from "hooks/downloadData";
import { TickerTable } from 'components/TickersTable';
import { useCustomStyles} from 'hooks/customStyles';
import tickers from '../data/ticers'
import Select from 'react-select';
import css from '../styles/Details.module.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Details = () => {
  const { Data, updateData} = useData();
  const {historicalData}=Data
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [update, setUpdate] = useState(false)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(true);

  const customStyles = useCustomStyles();

const onChange = (selectedOption) => {
  const tempChartName = selectedOption.label.split('-')[1]
  updateData({
  ticker:selectedOption.value,
  tickerName: selectedOption.label,
  chartName:tempChartName ,
 })
 setUpdate(true)
}

const onDateChange = (dates) => {
  const [start, end] = dates;
 setStartDate(start);
 setEndDate(end);
 if (end!==null){
  setIsDatepickerOpen(true)
 }
}

useEffect(()=>{
  if (isDatepickerOpen){
      if (startDate===null|| startDate===undefined){
          setStartDate(Data.startDate)
          setEndDate(Data.endDate)
      }
      else{
      const newStartDate=createDate(startDate)
      const newEndDate=createDate(endDate)
      updateData({
         startDate:newStartDate,
         endDate:newEndDate,
         newChart:true
          })
      }
      }
 
},[startDate, endDate, updateData, isDatepickerOpen, Data.startDate, Data.endDate])

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
  if (isDatepickerOpen===true){
      setIsDatepickerOpen(false)
      functionHistoricalData(Data.ticker, Data.startDate, Data.endDate)
          .then(data => {
              if (data) {
                      setUpdate(false)
                      updateData({
                        historicalData:data,
                        })
                    }
                  });
    }}, [Data.endDate, Data.startDate, historicalData, updateData, Data.ticker, update, isDatepickerOpen]);


  return (
    <div className={css.details}>
       <div className={css.inputDiv}>
       <Select className={css.slect} styles={customStyles} noOptionsMessage={() => options.length < 1 ? 'Enter at least 3 characters' : 'No options available'} placeholder={Data.ticker} value={{ label: `${Data.ticker} - ${Data.chartName}`, value: Data.ticker }} name={Data.ticker} options={options} onChange={onChange} onInputChange={onInputChange} />
       <DatePicker
                maxDate={new Date()}
                selected={startDate}
                onChange={onDateChange }
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                selectsRange
                />
       </div>
      <TickerTable historicalData={historicalData} setUpdate={setUpdate}/>
    </div>
  );
};