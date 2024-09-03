import { useEffect, useState } from "react";

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
                <div>
                    <div>
                        <p>Date: {downloadedHistoricalData[0].date}</p>
                        <p>Open: {downloadedHistoricalData[0].open}</p>
                        <p>Close: {downloadedHistoricalData[0].close}</p>
                        <p>High: {downloadedHistoricalData[0].high}</p>
                        <p>Low: {downloadedHistoricalData[0].low}</p>
                        <p>Volume: {downloadedHistoricalData[0].volume}</p>
                    </div>
                    <div>
                        <p>Date: {endDate}</p>
                        <p>Open: {downloadedLiveData.open}</p>
                        <p>Close: {downloadedLiveData.close}</p>
                        <p>High: {downloadedLiveData.high}</p>
                        <p>Low: {downloadedLiveData.low}</p>
                        <p>Volume: {downloadedLiveData.volume}</p>
                    </div>
                </div>
                
            ) : (
                downloadedHistoricalData.length > 0 && (
                    <div>
                        <div>
                            <p>Date: {downloadedHistoricalData[0].date}</p>
                            <p>Open: {downloadedHistoricalData[0].open}</p>
                            <p>Close: {downloadedHistoricalData[0].close}</p>
                            <p>High: {downloadedHistoricalData[0].high}</p>
                            <p>Low: {downloadedHistoricalData[0].low}</p>
                            <p>Volume: {downloadedHistoricalData[0].volume}</p>
                        </div>
                        <div>
                            <p>Date: {downloadedHistoricalData[downloadedHistoricalData.length - 1].date}</p>
                            <p>Open: {downloadedHistoricalData[downloadedHistoricalData.length - 1].open}</p>
                            <p>Close: {downloadedHistoricalData[downloadedHistoricalData.length - 1].close}</p>
                            <p>High: {downloadedHistoricalData[downloadedHistoricalData.length - 1].high}</p>
                            <p>Low: {downloadedHistoricalData[downloadedHistoricalData.length - 1].low}</p>
                            <p>Volume: {downloadedHistoricalData[downloadedHistoricalData.length - 1].volume}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}