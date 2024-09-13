import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import Select from 'react-select';
import tickers from '../data/ticers'
import { Loader } from "./Loader";
import { multiplyData } from '../hooks/downloadData';
import { BiLineChart } from "react-icons/bi";
import { BiSolidAddToQueue } from "react-icons/bi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import css from '../styles/Tickers.module.css'

export const Tickers=({setChartTicker, setChartName, setAddChartName, setAddChartTicker, addChartTicker, setSecondChart, secondChart})=>{
    const selectRef = useRef(null);
    const [list, setList] = useState()
    const [tickerList, setTickerList] = useState(['AAPL.US', 'EUR.FOREX', 'MSFT.US','GSPC.INDX'])
    const [search, setSearch] = useState(null)
    const [searchTerm, setSearchTerm]=useState(null)
    const [options, setOptions] = useState([]);
    const [multiplyList, setMultiplyList] = useState([])
    const [isLoading, setIsLoading] =useState(true)

    const customStyles = useMemo(() => ({
        control: (provided, state) => ({
            ...provided,
            minHeight: 10,
            borderTop: 'none',
            borderBottom: 'none',
            borderLeft: '0px solid transparent',
            borderRight: '0px solid transparent',
            boxShadow: state.isFocused ? 'none' : 'none', 
            '&:hover': {
                borderBottom: '2px solid blue',
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

    const openMenu=useCallback((index)=>{
        if ((search && search.length > 2) && selectRef.current === index) {
            return true;
        } else if ((search && search.length <3)||!search) {
            return false;
        }
    }, [search])

    const onClick = useCallback((event) => {
        const ticker=event.target.name
        const id = event.target.id
        const newTicker = ticker.split('.')[0];
        let country = ticker.split('.')[1];
        let results = tickers.filter(item => item.Code.includes(newTicker)); 
        if (id==='CreateGraph'){
        setChartTicker(event.target.name)
        setAddChartName(null)
        setAddChartTicker(null) 
        }
        else{setAddChartTicker(event.target.name);
        }
        if (country!=='US'){
        results = results.filter(item => item.Exchange.includes(country)); 
        } else  {
            results = results.filter(item => item.Country.includes('USA'))
        }
        results = results.filter(item => item.Code===(newTicker))
        if (id==='CreateGraph'){
            setChartName(results[0].Name) 
            setChartTicker(ticker) 

            setAddChartName(null)
            setAddChartTicker(null)
        }
        else if(id==='Add to Graph')
            {setAddChartName(results[0].Name)
            setAddChartTicker(ticker) 
            setSecondChart(true)
        }
        else if(id==='Remove from Graph')
            {
            setAddChartName(null)
             setAddChartTicker(null)
             setSecondChart(false)
        }
    
    }, [setChartTicker, setChartName, setAddChartName, setAddChartTicker,setSecondChart]);

    useEffect(() => {
        const intervalID = setInterval(() => {
            multiplyData(tickerList)
              .then(downloadedData => {
                if (downloadedData) {
                  const markup = downloadedData.map(data => {
                        const newTicker = data.code.split('.')[0];
                        let country = data.code.split('.')[1];
                        let results = tickers.filter(item => item.Code.includes(newTicker))
                        if (country!=='US'){
                            results = results.filter(item => item.Exchange.includes(country)); 
                        } else  {
                            results = results.filter(item => item.Country.includes('USA'))
                        }
                        results = results.filter(item => item.Code===(newTicker))
                        data.Name = (results[0].Name)
                        return data
                    })
                    setMultiplyList(markup);
                }
              });
          }, 2500);
    
          return () => clearInterval(intervalID);
      }, [tickerList]);

      useEffect(()=>{
        if (secondChart===false){
            setAddChartTicker(null)
        }
      },[secondChart, setAddChartTicker])

    useEffect(() => {
          setIsLoading(true)
            multiplyData(tickerList)
              .then(downloadedData => {
                if (downloadedData) {
                    const markup = downloadedData.map(data => {
                        const newTicker = data.code.split('.')[0];
                        let country = data.code.split('.')[1];
                        let results = tickers.filter(item => item.Code.includes(newTicker))
                        if (country!=='US'){
                            results = results.filter(item => item.Exchange.includes(country)); 
                        } else  {
                            results = results.filter(item => item.Country.includes('USA'))
                        }
                        results = results.filter(item => item.Code===(newTicker))
                        data.Name = (results[0].Name)
                        return data
                    })
                    setMultiplyList(markup);
                    setIsLoading(false)
                }
              });
          }, [tickerList]);

    useEffect(() => {
        if (searchTerm&&searchTerm.length>2){
            const results = tickers.filter(item => 
                item.Name.toLowerCase().includes(searchTerm) &&
                item.Type !== 'ETF' && 
                item.Type !== 'FUND' &&
                item.Type !== 'BOND' &&
                item.Type !== 'Mutual Fund'
            );
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
                <div className={css.tickersDiv} key={index} name={index}>
                        <div className={css.inputDataDiv}>
                            <div className={css.slectDiv}>
                            <Select className={css.selectTicker} styles={customStyles} ref={selectRef} menuIsOpen={openMenu(ticker.code)} name={ticker.code} value={{ label: `${ticker.code} - ${ticker.Name}`, value: ticker.code }} options={options} onChange={onChange} onInputChange={onInputChange}/>
                            </div>
                            <div className={css.dataDiv}>
                                <div className={css.simpleDatadiv}>{ticker.close!=='NA'? parseFloat(ticker.close).toFixed(2):'Brak Danych'}</div>
                                <div className={css.simpleDatadiv}>{ticker.change_p!=='NA'? `${parseFloat(ticker.change_p).toFixed(2)}%`:""}</div>
                            </div>
                            <div className={css.buttonsDiv}>
                                <button className={css.button} id='CreateGraph' name={ticker.code} onClick={onClick}><BiLineChart className={`${css.icon} ${css.iconCreate}`}/></button>
                                {ticker.code === addChartTicker ? (
                                <button className={css.button} id='Remove from Graph' name={ticker.code} onClick={onClick}><RiDeleteBack2Fill className={`${css.icon} ${css.iconRemove}`}/></button>
                                ) : (
                            <button className={css.button} id='Add to Graph' name={ticker.code} onClick={onClick}><BiSolidAddToQueue className={`${css.icon} ${css.iconAdd}`} /></button>
                            )}
                            </div>
                        </div>
            
                </div>
            ));
            setList(markup);
        }
    }, [multiplyList, options, addChartTicker, onChange, openMenu, onClick, customStyles]);

    return (
        <div className={css.mainDiv}> 
            {isLoading ? (
                <Loader className={css.tickersDiv}/>
            ) : (
                <div>{list}</div>
            )}     
        </div>
);
            
}