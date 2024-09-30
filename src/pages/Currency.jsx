import tickers from '../data/ticers'
import { useEffect, useState, useMemo } from 'react'
import Select from 'react-select';
import { useData } from "hooks/dataContext";
import { multiplyData} from 'hooks/downloadData';
import css from '../styles/Currency.module.css'


export const Currency =()=>{

    const { Data } = useData();
    const [tickerList, setTickerList]=useState([])
    const [liveList, setLivelList]=useState([])
    const [start, setStart] = useState(false)
    const [page, setPage]=useState(0)
    const [Buttons, setButtons] = useState()
    const [Currency, setCurrency] = useState([])
    const [itemsOnPage, setItemsOnPage] = useState(50)

    const options =useMemo(() =>[
                        { value: 20, label: 20 },
                        { value: 50, label: 50 },
                        { value: 100, label: 100 }, 
                    ],[])
    
    useEffect(()=>{
        let tempTickers = tickers.filter((ticker)=>ticker.Type === "Currency")
        tempTickers = tempTickers.slice(page, page + itemsOnPage).map((ticker) => `${ticker.Code}.${ticker.Exchange}`);
        setTickerList(tempTickers)
        setStart(true)},[page, itemsOnPage])

    useEffect(() => {
        if(start && tickerList && tickerList.length>0){
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
                    setStart(false)
                }
                )
            }
    }, [tickerList,Data.startDate, Data.endDate, setLivelList, start]);

    useEffect(()=>{
        const tempButtons = 
        <div>
            {page===0? (<button>{page+1}</button>
                ):(
                 <>
                    <button onClick={()=>setPage(page-1)}>{page}</button>
                    <div>...</div>
                    <button>{page+1}</button> 
                 </>
                 )
            }
            <div>...</div>
            <button onClick={()=>setPage(page+1)}>{page+2}</button>
            <Select options={options} onChange={(e)=>setItemsOnPage(e.value)} placeholder={itemsOnPage}></Select>
        </div>
        setButtons(tempButtons)
    },[liveList, page, options, itemsOnPage])
    
    useEffect(()=>{ 
        console.log(liveList)
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
        },[liveList])

    return(
        <div>
            {Buttons}
            {Currency}
            {Buttons}
        </div>

    )
}