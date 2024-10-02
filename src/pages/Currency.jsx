import tickers from '../data/ticers'
import { useEffect, useState, useMemo } from 'react'
import Select from 'react-select';
import { useData } from "hooks/dataContext";
import { multiplyData } from 'hooks/downloadData';
import { Loader2 } from "../components/loader2";
import {CurrencyTable} from '../components/CurrencyTable'
import css from '../styles/Currency.module.css'


export const Currency =()=>{

    const { Data } = useData();
    const [tickerList, setTickerList]=useState([])
    const [liveList, setLivelList]=useState([])
    const [start, setStart] = useState(false)
    const [page, setPage]=useState(0)
    const [Buttons, setButtons] = useState()
    const [sortedCurrencyByName, setSortedCurrencyByName] = useState([])
    const [itemsOnPage, setItemsOnPage] = useState(50)
    const [noOfItems, setNoOfItems] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

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
        let tempTickers = tickers.filter((ticker) => ticker.Code.slice(0, 3).includes(e.value) && (ticker.Type === "Currency"))
        setNoOfItems(tempTickers.length)
        let newTickersList = []
        for (let i = 0; i < tempTickers.length; i++) {
            const ticker = `${tempTickers[i].Code}.FOREX`
            newTickersList.push(ticker)
        }
        setTickerList(newTickersList)
        setStart(true)
        }
    
    useEffect(() => {
        let tempTickers = tickers.filter((ticker) => ticker.Type === "Currency" && ticker.Exchange !== "CC");
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
        }, []);
    
    useEffect(()=>{
        let tempTickers = tickers.filter((ticker)=>ticker.Type === "Currency" && ticker.Exchange !== "CC")
        tempTickers = tempTickers
                        .slice(page*itemsOnPage, page*itemsOnPage + itemsOnPage)
                        .map((ticker) => `${ticker.Code}.${ticker.Exchange}`);
        setTickerList(tempTickers)
        setStart(true)},[page, itemsOnPage])

    useEffect(() => {
        if (start && tickerList && tickerList.length > 0) {
            setIsLoading(true)
            let markup
            multiplyData(tickerList)
                .then(downloadedData => {
                    markup = downloadedData.map(data => {
                        const newTicker = data.code.split('.')[0];
                        let results = tickers.filter(item => item.Code.includes(newTicker))
                        data.Name = (results[0].Name)
                        return data
                    })
                    setLivelList(markup)
                    setStart(false)
                    setIsLoading(false)
                }
                )
            }
    }, [tickerList,Data.startDate, Data.endDate, setLivelList, start]);

    useEffect(() => {
        if (tickerList && tickerList.length > 0) {
        const tempButtons = (
            itemsOnPage < noOfItems ? (
                <div className={css.buttonsDiv}>
                    {page === 0 ? (
                        <button>{page + 1}</button>
                    ) : (
                        <>
                            <button onClick={() => setPage(page - 1)}>Prev</button>
                            <div>...</div>
                            <button>{page + 1}</button>
                        </>
                    )}
                    <div>...</div>
                    <button onClick={() => setPage(page + 1)}>Next</button>
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
                <div >
                    <div className={css.selectDiv}>
                        <Select className={css.select} options={sortedCurrencyByName} styles={customStyles} onChange={onCurrencyChange} placeholder={"Set Currency"}></Select>
                        <Select className={css.select} options={options}  styles={customStyles} onChange={(e) => setItemsOnPage(e.value)} placeholder={`Tickers on page ${itemsOnPage}`}></Select>   
                    </div>
                    <CurrencyTable liveList={liveList.length > 0 ? liveList : []} />
                    {Buttons}
                </div>
            )}
        </div>
    )
}