import { useEffect, useState } from "react";
import css from '../styles/TickerData.module.css'

export const TickerData = ({ downloadedHistoricalData, downloadedLiveData, endDate }) => {

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
                    <div>
                        <p className={css.paragraphDate}>Date: {downloadedHistoricalData[0].date}</p>
                        <p className={css.paragraph}>Open: {downloadedHistoricalData[0].open}</p>
                        <p className={css.paragraph}>Close: {downloadedHistoricalData[0].close}</p>
                        <p className={css.paragraph}>High: {downloadedHistoricalData[0].high}</p>
                        <p className={css.paragraph}>Low: {downloadedHistoricalData[0].low}</p>
                        <p className={css.paragraph}>Volume: {downloadedHistoricalData[0].volume}</p>
                    </div>
                    <div>
                        <p className={css.paragraphDate}>Date: {endDate}</p>
                        <p className={css.paragraph}>Open: {downloadedLiveData.open}</p>
                        <p className={css.paragraph}>Close: {downloadedLiveData.close}</p>
                        <p className={css.paragraph}>High: {downloadedLiveData.high}</p>
                        <p className={css.paragraph}>Low: {downloadedLiveData.low}</p>
                        <p className={css.paragraph}>Volume: {downloadedLiveData.volume}</p>
                    </div>
                </div>
                
            ) : (
                downloadedHistoricalData.length > 0 && (
                    <div className={css.mainDiv}>
                        <div>
                            <p className={css.paragraphDate}>Date: {downloadedHistoricalData[0].date}</p>
                            <p className={css.paragraph}>Open: {downloadedHistoricalData[0].open}</p>
                            <p className={css.paragraph}>Close: {downloadedHistoricalData[0].close}</p>
                            <p className={css.paragraph}>High: {downloadedHistoricalData[0].high}</p>
                            <p className={css.paragraph}>Low: {downloadedHistoricalData[0].low}</p>
                            <p className={css.paragraph}>Volume: {downloadedHistoricalData[0].volume}</p>
                        </div>
                        <div>
                            <p className={css.paragraphDate}>Date: {downloadedHistoricalData[downloadedHistoricalData.length - 1].date}</p>
                            <p className={css.paragraph}>Open: {downloadedHistoricalData[downloadedHistoricalData.length - 1].open}</p>
                            <p className={css.paragraph}>Close: {downloadedHistoricalData[downloadedHistoricalData.length - 1].close}</p>
                            <p className={css.paragraph}>High: {downloadedHistoricalData[downloadedHistoricalData.length - 1].high}</p>
                            <p className={css.paragraph}>Low: {downloadedHistoricalData[downloadedHistoricalData.length - 1].low}</p>
                            <p className={css.paragraph}>Volume: {downloadedHistoricalData[downloadedHistoricalData.length - 1].volume}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}