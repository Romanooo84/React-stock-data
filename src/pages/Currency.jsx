import tickers from '../data/ticers'
import { useEffect, useState } from 'react'
import { useData } from "hooks/dataContext";
import { multiplyData} from 'hooks/downloadData';


export const Currency =()=>{

    const { Data } = useData();
    const [tickerList, setTickerList]=useState([])
    const [liveList, setLivelList]=useState([])
    const [start, setStart] = useState(false)
    useEffect(()=>{
    let tempTickers = tickers.filter((ticker)=>ticker.Type === "Currency" && ticker.Exchange === 'FOREX' && ticker.Currency==='USD')
    tempTickers = tempTickers.map((ticker)=>[`${ticker.Code}.${ticker.Exchange}`])
    setTickerList(tempTickers)
    setStart(true)},[])

    useEffect(() => {
        if(start && tickerList && tickerList.length>0){
            let markup
            console.log(tickerList)
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
        console.log(liveList)
    },[liveList])
    
    return(
        <div>Currency</div>
    )
}