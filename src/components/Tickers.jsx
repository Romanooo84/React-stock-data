import { useState, useEffect, useCallback, useMemo } from "react"
import Select from 'react-select';
import tickers from '../data/ticers'
import { Loader2 } from "./loader2";
import { TickerData } from "./TickerData";
import { multiplyData, historicalData } from '../hooks/downloadData';
import { BiLineChart } from "react-icons/bi";
import { BiSolidAddToQueue } from "react-icons/bi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import css from '../styles/Tickers.module.css'
import { useData } from "hooks/dataContext";



export const Tickers = () => {
    const [list, setList] = useState()
    const [tickerList, setTickerList] = useState(['AAPL.US', 'EUR.FOREX', 'MSFT.US', 'GSPC.INDX'])
    const [search, setSearch] = useState(null)
    const [searchTerm, setSearchTerm] = useState(null)
    const [options, setOptions] = useState([]);
    const [multiplyList, setMultiplyList] = useState([])
    const [changedTicker, setChangedTicker] = useState(false)
    const [liveList, setLivelList] = useState([])
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSelect, setActiveSelect] = useState(null);
    const { Data, updateData } = useData();

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
        updateData({ isStartPage: true })
        setSearch('')
        setChangedTicker(true)
        const newTicker = selectedOption.value
        const previousTicker = index.name
        const tickerIndex = tickerList.indexOf(previousTicker);
        const newTickerList = tickerList.map((ticker, index) => {
            if (tickerIndex === index) {
                return newTicker
            } else {
                return ticker
            }
        })
        setTickerList(newTickerList)
        setActiveSelect(null)
    }, [tickerList, updateData])

    const onInputChange = (event) => {
        setSearch(event.toLowerCase())
    }

    const onClick = useCallback((event) => {
        const ticker = event.target.name
        const id = event.target.id
        const newTicker = ticker.split('.')[0];
        let country = ticker.split('.')[1];
        let results = tickers.filter(item => item.Code.includes(newTicker));
        if (id === 'CreateGraph') {
            updateData(
                {
                    ticker: event.target.name,
                    isSecondChart: false,
                    isRegression: false,
                    newChart: true,
                }
            )
        }
        else {
            updateData(
                { secondChartName: event.target.name }
            )
        }
        if (country !== 'US') {
            results = results.filter(item => item.Exchange.includes(country));
        } else {
            results = results.filter(item => item.Country.includes('USA'))
        }
        results = results.filter(item => item.Code === (newTicker))
        if (id === 'CreateGraph') {
            updateData(
                {
                    chartName: results[0].Name,
                    chartTicker: ticker,
                    isSecondChart: false,
                    isRegression: false,
                }

            )
        }
        else if (id === 'Add to Graph') {
            updateData(
                {
                    secondChartName: results[0].Name,
                    secondChartTicker: ticker,
                    isSecondChart: true,
                    isStartPage: true,

                }
            )
        }
        else if (id === 'Remove from Graph') {
            setMultiplyList(Data.multiplyList)
            updateData({
                isSecondChart: false,
            })
        }

    }, [updateData, Data.multiplyList]);

    const handleFocus = (tickerCode) => {
        setActiveSelect(tickerCode);
    };

    const handleBlur = () => {
        setActiveSelect(null);
    };

    useEffect(() => {
        if (Data.isStartPage && !Data.isSecondChart && !changedTicker) {
            updateData({
                isLoading: true,
            })
        }
        else if (changedTicker) {
            setChangedTicker(false)
        }
    }, [updateData, Data.isStartPage, Data.isSecondChart, changedTicker])

    useEffect(() => {
        const intervalID = setInterval(() => {
            if(!isMenuOpen)
                multiplyData(tickerList)
                .then(downloadedData => {
                    if (downloadedData && !Data.isDatepickerOpen) {
                        const markup = downloadedData.map(data => {
                            const newTicker = data.code.split('.')[0];
                            let country = data.code.split('.')[1];
                            let results = tickers.filter(item => item.Code.includes(newTicker))
                            if (country !== 'US') {
                                results = results.filter(item => item.Exchange.includes(country));
                            } else {
                                results = results.filter(item => item.Country.includes('USA'))
                            }
                            results = results.filter(item => item.Code === (newTicker))
                            data.Name = (results[0].Name)
                                
                            return data
                        })
                        setMultiplyList(markup);
                        setLivelList(markup)
                    }
                }
                );
        }, 5000);

        return () => clearInterval(intervalID);
    }, [tickerList, Data.isDatepickerOpen, isMenuOpen]);

    useEffect(() => {
        if (Data.secondChart === false) {
            updateData({ seconChartTicker: null })
        }
    }, [Data.secondChart, updateData])

    useEffect(() => {
        if (Data.isStartPage) {
            updateData({ 
                isStartPage: false
            })
            let markup
            multiplyData(tickerList)
                .then(downloadedData => {
                    markup = downloadedData.map(data => {
                        const newTicker = data.code.split('.')[0];
                        let country = data.code.split('.')[1];
                        let results = tickers.filter(item => item.Code.includes(newTicker))
                        if (country !== 'US') {
                            results = results.filter(item => item.Exchange.includes(country));
                        } else {
                            results = results.filter(item => item.Country.includes('USA'))
                        }
                        results = results.filter(item => item.Code === (newTicker))
                        data.Name = (results[0].Name)
                        return data
                    })
                    setLivelList(markup)
                }
                ).then(() => {
                    let historicalList = []
                    let promises = []
                    for (let i = 0; i < tickerList.length; i++) {
                        let promise = historicalData(tickerList[i], Data.startDate, Data.endDate)
                            .then(data => {
                                historicalList.push({ [tickerList[i]]: data })
                            })
                        promises.push(promise);
                    }
                    Promise.all(promises).then(() => {
                        updateData({
                            tickersHistoricalList: historicalList,
                        });
                        setMultiplyList(markup)
                    });
                    }
                );
        }
    }, [tickerList, Data.isStartPage, updateData,Data.startDate, Data.endDate]);

    useEffect(() => {
        if (search && search.length > 2) {
            setMultiplyList(Data.multiplyList)
            const results = tickers.filter(item =>
                item.Name.toLowerCase().includes(searchTerm) &&
                item.Type !== 'ETF' &&
                item.Type !== 'FUND' &&
                item.Type !== 'BOND' &&
                item.Type !== 'Mutual Fund'
            );
            const options = results.map(item => ({
                value: item.Country === 'USA' ? `${item.Code}.US` : `${item.Code}.${item.Exchange}`,
                label: `${item.Code}-${item.Name}`
            }));

            setOptions(options);
        }
    }, [search,searchTerm, Data.multiplyList])


    useEffect(() => {
        if(search&&search.length>0){
            setIsMenuOpen(true)
            setSearchTerm(search)
        }else if (search&&search.length===0){
            setIsMenuOpen(false)
            setSearchTerm(search)
        }
    }, [search])

    useEffect(() => {
        if ((multiplyList.length > 0 && Data.tickersHistoricalList && Data.tickersHistoricalList.length > 3)) {
            const markup = multiplyList.map((ticker, index) => { 
                let historical
                for (let i = 0; i < Data.tickersHistoricalList.length; i++){
                    if (Data.tickersHistoricalList[i][ticker.code]) {
                        historical = Data.tickersHistoricalList[i][ticker.code];
                        break;  
                    }
                }
                const live = liveList[index]
                return(
                <div className={css.tickersDiv} key={index} name={index}>
                        <div className={css.inputDataDiv}>
                            <div className={css.slectDiv}>
                            <Select className={css.selectTicker} styles={customStyles} onBlur={handleBlur} onFocus={() => handleFocus(ticker.code)} name={ticker.code} value={{ label: `${ticker.code} - ${ticker.Name}`, value: ticker.code }} options={options} onChange={onChange} onInputChange={onInputChange}/>
                            </div>
                            <div className={css.dataDiv}>
                                <div className={css.simpleDatadiv}>{ticker.close!=='NA'? parseFloat(ticker.close).toFixed(2):'Brak Danych'}</div>
                                <div className={css.simpleDatadiv}>{ticker.change_p!=='NA'? `${parseFloat(ticker.change_p).toFixed(2)}%`:""}</div>
                            </div>
                            <div className={css.buttonsDiv}>
                                <button className={css.button} id='CreateGraph' name={ticker.code} onClick={onClick}><BiLineChart className={`${css.icon} ${css.iconCreate}`}/></button>
                            {Data.secondChartTicker===ticker.code && Data.isSecondChart? (
                                <button className={css.button} id='Remove from Graph' name={ticker.code} onClick={onClick}><RiDeleteBack2Fill className={`${css.icon} ${css.iconRemove}`}/></button>
                             ) : (
                                <button className={css.button} id='Add to Graph' name={ticker.code} onClick={onClick}><BiSolidAddToQueue className={`${css.icon} ${css.iconAdd}`} /></button>
                            )}
                            </div>
                            <div className={`${css.visuallyHidden} ${css.active}`}>
                            <TickerData  key={index} downloadedHistoricalData={historical} downloadedLiveData={live} endDate={Data.endDate}  file={'Tickers'}/>
                            </div>
                        </div>

                </div>
            )});
            setList(markup);
            updateData({
                isLoading: false,
                multiplyList
            })
            setMultiplyList([])
        }
    }, [multiplyList, options, onChange, onClick,activeSelect, customStyles, Data.secondChartTicker, Data.isSecondChart, updateData, Data.endDate, Data.tickersHistoricalList, liveList]);


    return (
        <div className={css.mainDiv}> 
            {Data.isLoading ===true ? (
                <div>
                <Loader2 className={css.tickersDiv}/>
                </div>
            ) : (
                    <>
                        <div>{list}</div>
                    </>
            )}     
        </div>
);
}