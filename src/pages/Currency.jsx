import tickers from '../data/ticers'
import { useEffect, useState, useMemo } from 'react'
import Select from 'react-select';
import { useData } from "hooks/dataContext";
import { multiplyData } from 'hooks/downloadData';
import { Loader2 } from "../components/loader2";
import css from '../styles/Currency.module.css'


export const Currency =()=>{

    const { Data } = useData();
    const [tickerList, setTickerList]=useState([])
    const [liveList, setLivelList]=useState([])
    const [start, setStart] = useState(false)
    const [page, setPage]=useState(0)
    const [Buttons, setButtons] = useState()
    const [Currency, setCurrency] = useState([])
    const [sortedCurrencyByName, setSortedCurrencyByName] = useState([])
    const [itemsOnPage, setItemsOnPage] = useState(50)
    const [noOfItems, setNoOfItems] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const options =useMemo(() =>[
                        { value: 20, label: 20 },
                        { value: 50, label: 50 },
                        { value: 100, label: 100 }, 
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
        let tempTickers = tickers.filter((ticker) => ticker.Type === "Currency");
        setNoOfItems(tempTickers.length)
        let newTickerTable = tempTickers.map((ticker) => {
            const splitName = ticker.Name.split('/'); 
            return {
                fullCode: ticker.Code,
                fullName: ticker.Name,
                code: ticker.Code.slice(0, 3),
                name: ticker.Code.slice(0, 3) === 'USD' ? splitName[0] : splitName[1] 
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
        let tempTickers = tickers.filter((ticker)=>ticker.Type === "Currency")
        tempTickers = tempTickers
                        .slice(page, page + itemsOnPage)
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
                <div>
                    {page === 0 ? (
                        <button>{page + 1}</button>
                    ) : (
                        <>
                            <button onClick={() => setPage(page - 1)}>{page}</button>
                            <div>...</div>
                            <button>{page + 1}</button>
                        </>
                    )}
                    <div>...</div>
                    <button onClick={() => setPage(page + 1)}>{page + 2}</button>
                </div>
            ) : (
               <></>
            )
        );
        setButtons(tempButtons);
    }
}, [liveList, page, options, itemsOnPage, sortedCurrencyByName, tickerList, noOfItems]);

    
    useEffect(()=>{ 
        if (liveList.length>0){
        let tempCurrency = liveList.map((data)=>
            <div className={css.List} key={data.code}>
                <div className={css.tickerName}>
                    <p>{data.Name}</p>
                    <p>{data.code}</p>
                </div>
                <div className={css.tickerData}>
                    <div>
                        <p>Change</p>
                        <p>{data.change}</p>
                        <p>{data.change_p} %</p>
                    </div>
                    <div>
                        <p>Close</p>
                        <p>{data.close}</p>
                    </div>
                    <div>
                        <p>Previus Close</p>
                        <p>{data.previousClose}</p>
                    </div>
                    <div>
                        <p>Open</p>
                        <p>{data.open}</p>
                    </div>
                    <div>
                        <p>High</p>
                        <p>{data.high}</p>
                    </div>
                    <div>
                        <p>Low</p>
                        <p>{data.low}</p>
                    </div>
                    <div>
                        <p>Time</p>
                        <p>{data.timestamp}</p>
                    </div>
                </div>
            </div>
        )
        setCurrency(tempCurrency)
        }},[liveList])

    return (
            isLoading?
                ( <Loader2 className = { css.tickersDiv } />): (
                <div>
                    {Buttons}
                    <Select options={options} onChange={(e) => setItemsOnPage(e.value)} 
                                placeholder={itemsOnPage}>
                        </Select>
                        <Select 
                                options={sortedCurrencyByName} 
                                onChange={onCurrencyChange} 
                                placeholder={"Set Currency"}>
                            </Select>
                        {Currency}
                        {Buttons}
                </div>
            )
    )
}