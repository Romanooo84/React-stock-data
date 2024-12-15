//import tickers from '../data/ticers'
import { useEffect, useState, useMemo } from 'react'
import Select from 'react-select';
import { useData } from "hooks/dataContext";
import { multiplyData } from 'hooks/downloadData';
import { Loader2 } from "../components/loader2";
import {CurrencyTable} from '../components/CurrencyTable'
import { PiArrowFatLinesRightFill } from "react-icons/pi";
import { PiArrowFatLinesLeftFill } from "react-icons/pi";
import css from '../styles/Currency.module.css'



export const Currency =()=>{

    const { Data } = useData();
    const [tickerList, setTickerList] = useState([])
    const [currencyList, setCurrencyList] = useState([])
    const [downloadedData, setDownloadedData] = useState([])
    const [liveList, setLivelList]=useState([])
    const [start, setStart] = useState(true)
    const [page, setPage]=useState(0)
    const [Buttons, setButtons] = useState()
    const [sortedCurrencyByName, setSortedCurrencyByName] = useState([])
    const [itemsOnPage, setItemsOnPage] = useState(50)
    const [noOfItems, setNoOfItems] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSorting, setIsSorting] = useState(false)
    const [isCurrency, setIsCurrency] = useState(false)
    const [tickers, setTickers] = useState(null)

    const customStyles =useMemo(() => ({
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
          indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
          }),
        }), []);
      

    const options =useMemo(() =>[
                        { value: 20, label: `Tickers on page 20` },
                        { value: 50, label: `Tickers on page 50` },
                        { value: 100, label: `Tickers on page 100` }, 
    ], [])

    const onCurrencyChange = (e) => {
        setIsSorting(false)
        setIsCurrency(true)
        setStart(true)
        let tempTickers = tickers.filter((ticker) => {
            try {
                return(ticker.Code.slice(0, 3).includes(e.value) && (ticker.Type === "Currency"))
            }
            catch (error) {
                return null
            }
        })
        setNoOfItems(tempTickers.length)
        let newTickersList = []
        for (let i = 0; i < tempTickers.length; i++) {
            const ticker = `${tempTickers[i].Code}.FOREX`
            newTickersList.push(ticker)
        }
        setCurrencyList(newTickersList)
        setTickerList(newTickersList)
    }
    
     useEffect(() => {
        setTickers(Data.tickers)
    },[Data.tickers])
    
    useEffect(() => {
        if (tickers !== undefined && tickers !== null) {
            let tempTickers = tickers.filter((ticker) => {
                try {
                    return (ticker.Type === "Currency" && ticker.Exchange !== "CC")
                }
                catch (error)
                {
                    console.log('błąd')
                    return null
                }
            });
            setNoOfItems(tempTickers.length)
            let newTickerTable = tempTickers.map((ticker) => {
                const splitName = ticker.Name.split('/');
                const currencyCode = ticker.Code.slice(0, 3);
                const isSpecialCurrency = ["ARS", "USD", "EGP", "KES", 'KWD', 'AED'].includes(currencyCode);
                return {
                    fullCode: ticker.Code,
                    fullName: ticker.Name,
                    code: currencyCode,
                    name: isSpecialCurrency ? splitName[0] : splitName[1]
                };
            })
                .filter((ticker, index, self) => {
                    return index === self.findIndex((t) =>
                        t.code === ticker.code && t.fullName.includes('/') && t.fullName.length > 7
                    );
                })
                .map((ticker) => ({
                    value: ticker.code, label: ticker.name
                }))
            setSortedCurrencyByName(newTickerTable);
        }
    }, [tickers]);
    
    useEffect(() => {
        setStart(true)
        if (!isCurrency && tickers !== undefined && tickers !== null) {
            let tempTickers = tickers
            .filter((ticker) => {
                try {
                    // Ensure ticker has Type "Currency" and Exchange is not "CC"
                    return (ticker.Type === "Currency" && ticker.Exchange !== "CC");
                } catch (error) {
                    console.log('Błąd');
                    return false;
                }
            })
            .slice(page * itemsOnPage, page * itemsOnPage + itemsOnPage) // Apply pagination slicing after filtering
                .map((ticker) => {
                    try {
                        return(`${ticker.Code}.${ticker.Exchange}`)
                    }
                    catch (error) {
                        return null
                    }
                }); // Map the filtered and sliced tickers to desired format

    setTickerList(tempTickers);
} else if (currencyList.length>itemsOnPage){
            let tempTickers=currencyList.slice(page * itemsOnPage, page * itemsOnPage + itemsOnPage)
            setTickerList(tempTickers)
        } else {
            setTickerList(currencyList)
        }
    }, [page, itemsOnPage, isCurrency, currencyList, tickers])

    useEffect(() => {
        if (start && tickerList && tickerList.length > 0 && tickers !== undefined && tickers !== null) {
            setIsLoading(true)
            setStart(false)
            let markup
            multiplyData(tickerList)
                .then(downloadedData => {
                    markup = downloadedData.map(data => {
                        const newTicker = data.code.split('.')[0];
                        let results = tickers.filter(item => {
                            try {
                                return (item.Code.includes(newTicker))
                            }
                            catch (error) {
                                return null
                            }
                            
                            
                        })
                        data.Name = (results[0].Name)
                        return data
                    })
                    setLivelList(markup)
                    setIsLoading(false)
                }
                )
            }
    }, [tickerList,Data.startDate, Data.endDate, setLivelList, start, tickers]);

    useEffect(() => {
        const intervalID = setInterval(() => {
            if (tickers !== undefined && tickers !== null &&(!start || !isSorting)) {
                multiplyData(tickerList).then(downloadedData => {
                    const markup = downloadedData.map(data => {
                        const newTicker = data.code.split('.')[0];
                        let results = tickers.filter(item => item.Code.includes(newTicker));
                        data.Name = results[0]?.Name || data.Name; 
                        return data;
                    });
                    setDownloadedData(markup)   
                });
            }
        }, 15000);
    
        return () => clearInterval(intervalID);
    }, [tickerList, setDownloadedData, start, isSorting, tickers]);

    useEffect(()=>{  
        if(!isSorting){
                setLivelList(downloadedData)};
           },[setLivelList ,downloadedData, isSorting])
  

    useEffect(() => {
        if (tickerList && tickerList.length > 0) {
        const tempButtons = (
            itemsOnPage < noOfItems ? (
                <div className={css.buttonsDiv}>
                    {page === 0 ? (
                        <div className={css.pageNoDiv}>{page + 1}</div>
                    ) : (
                        <>
                            <button className={css.button} onClick={() => setPage(page - 1)}><PiArrowFatLinesLeftFill className={css.icon}/></button>
                            <div className={css.pageNoDiv}>{page + 1}</div>
                        </>
                    )}
                    
                    <button className={css.button} onClick={() => setPage(page + 1)}><PiArrowFatLinesRightFill className={css.icon}/></button>
                </div>
            ) : (
               <></>
            )
        );
        setButtons(tempButtons);
    }
}, [liveList, page, options, itemsOnPage, sortedCurrencyByName, tickerList, noOfItems]);
 
    return (
        <div className={css.mainDiv}>
           { isLoading?
                ( <Loader2 className = { css.tickersDiv } />): (
                <div className={css.tableDiv} >
                    <div className={css.selectDiv}>
                        <Select className={css.select} options={sortedCurrencyByName} styles={customStyles} onChange={onCurrencyChange} placeholder={"Set Currency"}></Select>
                        <Select className={css.select} options={options}  styles={customStyles} onChange={(e) => {setIsSorting(false);setItemsOnPage(e.value);}}placeholder={`Tickers on page ${itemsOnPage}`}></Select>   
                    </div>
                         <CurrencyTable isSorting={isSorting} setTickerList= {setTickerList} setIsSorting={setIsSorting} liveList={liveList.length> 0 ? liveList : []} />
                    {Buttons}
                </div>
            )}
        </div>
    )
}