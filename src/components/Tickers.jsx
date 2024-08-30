import { useState, useEffect, useRef, useCallback } from "react"
import Select from 'react-select';
import tickers from '../data/ticers'
import { multiplyData } from '../hooks/downloadData';

export const Tickers=({setChartTicker, setChartName, setAddChartName, setAddChartTicker, addChartTicker})=>{
    const selectRef = useRef(null);
    const [list, setList] = useState()
    const [tickerList, setTickerList] = useState(['AAPL.US', 'EUR.FOREX', 'MSFT.US','AAAU.US'])
    const [search, setSearch] = useState(null)
    const [searchTerm, setSearchTerm]=useState(null)
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
        const newTicker = ticker.split('.')[0];
        let country = ticker.split('.')[1];
        let results = tickers.filter(item => item.Code.includes(newTicker)); 
        if (event.target.id==='CreateGraph'){
        setChartTicker(event.target.name); }
        else{setAddChartTicker(event.target.name);
        }
        if (country!=='US'){
        results = results.filter(item => item.Exchange.includes(country)); 
        } else {
            results = results.filter(item => item.Country.includes('USA'))
        }
        results = results.filter(item => item.Code===(newTicker))
        if (event.target.id==='CreateGraph'){
            setChartName(results[0].Name) 
        }
        else if(event.target.id==='Add to Graph')
            {setAddChartName(results[0].Name)
        }
        else if(event.target.id==='Remove from Graph')
            {setAddChartName('none')
             setAddChartTicker('none')
        }
    
    }, [setChartTicker, setChartName, setAddChartName, setAddChartTicker]);

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
                    <button id='CreateGraph' name={ticker.code}onClick={onClick}>Create Graph</button>
                    {ticker.code === addChartTicker ? (
                    <button id='Remove from Graph' name={ticker.code} onClick={onClick}>Remove from Graph</button>
                     ) : (
                    <button id='Add to Graph' name={ticker.code} onClick={onClick}>Add to Graph</button>
                     )}
                </div>
            ));
            setList(markup);
        }
    }, [multiplyList, options, addChartTicker, onChange, openMenu, placeholder, onClick]);

    
    useEffect(() => {
        setOptions([{ label: '3 char', value: 'initial' }]);
     },[]);

    return(
            <div>{list}</div>
    )
}