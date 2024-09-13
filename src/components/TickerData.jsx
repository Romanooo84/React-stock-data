import { useEffect, useState } from "react";
import css from '../styles/TickerData.module.css'

export const TickerData = ({ downloadedHistoricalData, downloadedLiveData, endDate }) => {
    console.log(downloadedLiveData)
    console.log(downloadedHistoricalData)
    const [actualDate, setActualDate]=useState()
    useEffect(() => {
        if (downloadedLiveData.code) {
           const tempDate = new Date(downloadedLiveData.timestamp * 1000);
           const formattedDate = tempDate.toISOString().split('T')[0];
            if (formattedDate === endDate) {
                setActualDate(true)
            }
            else{setActualDate(false)}
        }
    },[downloadedLiveData.code, endDate, downloadedLiveData.timestamp])

    return (
        <div>
            {actualDate && downloadedHistoricalData.length>0 ? (    
                <div className={css.mainDiv}>
                    <div className={css.dateDiv}>
                        <p className={css.paragraphDate}>{downloadedHistoricalData[0].date}</p>
                        <p className={css.paragraphDate}>{endDate}</p>
                    </div>
                    <div className={css.dataDiv}>
                        <div className={css.partDiv}>
                            <div>
                                <p className={css.paragraph}>Open: {parseFloat(downloadedHistoricalData[0].open).toFixed(2)}</p>
                                <p className={css.paragraph}>Close: {parseFloat(downloadedHistoricalData[0].close).toFixed(2)}</p>
                            </div>
                            <div>
                                <p className={css.paragraph}>High: {parseFloat(downloadedHistoricalData[0].high).toFixed(2)}</p>
                                <p className={css.paragraph}>Low: {parseFloat(downloadedHistoricalData[0].low).toFixed(2)}</p>
                            </div>
                            <p className={css.paragraph}>Volume: {downloadedHistoricalData[0].volume}</p>
                        </div>
                        <div className={css.partDiv}>
                            <div>
                                <p className={css.paragraph}>Open: {parseFloat(downloadedLiveData.open).toFixed(2)}</p>
                                <p className={css.paragraph}>Close: {parseFloat(downloadedLiveData.close).toFixed(2)}</p>
                            </div>
                            <div>
                                <p className={css.paragraph}>High: {parseFloat(downloadedLiveData.high).toFixed(2)}</p>
                                <p className={css.paragraph}>Low: {parseFloat(downloadedLiveData.low).toFixed(2)}</p>
                            </div>
                            <p className={css.paragraph}>Volume: {downloadedLiveData.volume}</p>
                        </div>
                    </div>
                </div>
                
            ) : (
                downloadedHistoricalData.length > 0 && (
                    <div className={css.mainDiv}>
                        <div className={css.dateDiv}>
                            <p className={css.paragraphDate}>{downloadedHistoricalData[0].date}</p>
                            <p className={css.paragraphDate}>{endDate}</p>
                        </div>
                        <div className={css.dataDiv}>      
                            <div className={css.partDiv}>
                                <p className={css.paragraph}>Open: {parseFloat(downloadedHistoricalData[0].open).toFixed(2)}</p>
                                <p className={css.paragraph}>Close: {parseFloat(downloadedHistoricalData[0].close).toFixed(2)}</p>
                                <p className={css.paragraph}>High: {parseFloat(downloadedHistoricalData[0].high).toFixed(2)}</p>
                                <p className={css.paragraph}>Low: {parseFloat(downloadedHistoricalData[0].low).toFixed(2)}</p>
                                <p className={css.paragraph}>Volume: {downloadedHistoricalData[0].volume}</p>
                            </div>
                            <div className={css.partDiv}> 
                                <p className={css.paragraph}>Open: {parseFloat(downloadedHistoricalData[downloadedHistoricalData.length - 1].open).toFixed(2)}</p>
                                <p className={css.paragraph}>Close: {parseFloat(downloadedHistoricalData[downloadedHistoricalData.length - 1].close).toFixed(2)}</p>
                                <p className={css.paragraph}>High: {parseFloat(downloadedHistoricalData[downloadedHistoricalData.length - 1].high).toFixed(2)}</p>
                                <p className={css.paragraph}>Low: {parseFloat(downloadedHistoricalData[downloadedHistoricalData.length - 1].low).toFixed(2)}</p>
                                <p className={css.paragraph}>Volume: {downloadedHistoricalData[downloadedHistoricalData.length - 1].volume}</p>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}