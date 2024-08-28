import { useState, useEffect, useRef, useCallback } from "react"
import Select from 'react-select';
import tickers from '../data/ticers'
import { multiplyData } from '../hooks/downloadData';

export const Tickers=({setChartTicker, setChartName})=>{
    const selectRef = useRef(null);
    const [list, setList] = useState()
    const [tickerList, setTickerList] = useState(['AAPL.US', 'EUR.FOREX', 'MSFT.US','AAAU.US'])
    const [search, setSearch] = useState()
    const [searchTerm, setSearchTerm]=useState()
    const [options, setOptions] = useState([]);
    const [multiplyList, setMultiplyList] = useState([])

    const onChange = useCallback((selectedOption, index) => {
        const newTicker = selectedOption.value
        const previousTicker = index.name
        const tickerIndex = tickerList.indexOf(previousTicker);
        const newTickerList=tickerList.map((ticker, index)=>{
            if(tickerIndex===index){
                return newTicker
            }else{
                return ticker
            }
        })
        setTickerList(newTickerList)
    },[tickerList])
    
    const onInputChange = (event) => {
        setSearch(event.toLowerCase())
    }

    const placeholder=useCallback((index)=>{
        return tickerList[index] || 'Select ticker';
    },[tickerList])

    const openMenu=useCallback((index)=>{
        if ((search && search.length > 2) && selectRef.current === index) {
            return true;
        } else if ((search && search.length <3)||!search) {
            return false;
        }
    }, [search])

    const onClick = useCallback((event) => {
        const ticker=event.target.name
        console.log(ticker)
        const newTicker = ticker.split('.')[0];
        let country = ticker.split('.')[1];
        let results = tickers.filter(item => item.Code.includes(newTicker)); 
        console.log(results)
        results = results.filter(item => item.Exchange.includes(country)); 
        setChartTicker(event.target.name);
        console.log(results)
        setChartName(results[0].Name)
        console.log('clicked')
    }, [setChartTicker, setChartName]);

    useEffect(() => {
        const intervalID = setInterval(() => {
            multiplyData(tickerList)
              .then(downloadedData => {
                if (downloadedData) {
                  setMultiplyList(downloadedData);
                }
              });
          }, 2500);
    
          return () => clearInterval(intervalID);
      }, [tickerList]);

      useEffect(() => {
            multiplyData(tickerList)
              .then(downloadedData => {
                if (downloadedData) {
                  setMultiplyList(downloadedData);
                }
              });
          }, [tickerList]);

    useEffect(() => {
        if (searchTerm&&searchTerm.length>2){
        const results = tickers.filter(item => item.Name.toLowerCase().includes(searchTerm));    
        const options = results.map(item => ({
          value: item.Country==='USA'? `${item.Code}.US`:`${item.Code}.${item.Exchange}`,
          label: `${item.Code}-${item.Name}`
        }));
    
        setOptions(options);}
      }, [searchTerm])


    useEffect(() => {
            setSearchTerm(search)
    }, [search])



     useEffect(() => {
        if (multiplyList.length > 0) {
            const markup = multiplyList.map((ticker, index) => (
                <div key={index} name={index}>
                    <Select ref={selectRef} menuIsOpen={openMenu(ticker.code)} name={ticker.code} placeholder={placeholder(index)} options={options} onChange={onChange} onInputChange={onInputChange}/>
                    <div>{ticker.close!=='NA'? ticker.close:'Brak Danych'}</div>
                    <div>{ticker.change_p!=='NA'? `${ticker.change_p}%`:""}</div>
                    <button name={ticker.code}onClick={onClick}>
      Create Graph
    </button>
                </div>
            ));
            setList(markup);
        }
    }, [multiplyList, options, onChange, openMenu, placeholder, onClick]);

    
    useEffect(() => {
        setOptions([{ label: '3 char', value: 'initial' }]);
     },[]);

    return(
            <div>{list}</div>
    )
}