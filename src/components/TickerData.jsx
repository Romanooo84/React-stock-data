export const TickerData=({downloadedHistoricalData})=>{
    if(downloadedHistoricalData.length>0){
    return(
        <div>
            <div>
                <p> Date: {downloadedHistoricalData[0].date}</p>
                <p> Open: {downloadedHistoricalData[0].open}</p>
                <p> Close: {downloadedHistoricalData[0].close}</p>
                <p> High: {downloadedHistoricalData[0].high}</p>
                <p> Low: {downloadedHistoricalData[0].low}</p>
                <p> Volume: {downloadedHistoricalData[0].volume}</p>
            </div>
            <div>
                <p> Date: {downloadedHistoricalData[downloadedHistoricalData.length-1].date}</p>
                <p> Open: {downloadedHistoricalData[downloadedHistoricalData.length-1].open}</p>
                <p> Close: {downloadedHistoricalData[downloadedHistoricalData.length-1].close}</p>
                <p> High: {downloadedHistoricalData[downloadedHistoricalData.length-1].high}</p>
                <p> Low: {downloadedHistoricalData[downloadedHistoricalData.length-1].low}</p>
                <p> Volume: {downloadedHistoricalData[downloadedHistoricalData.length-1].volume}</p>
            </div>
        </div>
    )
}
}