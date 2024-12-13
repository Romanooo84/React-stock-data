const { listOfExchanges, listOfTickers} = require( "../downloads")

const tickerListDownload = async()=>{
    let tempListofTickers = []
    const tempListOfExchanges = await listOfExchanges()
    for (i=0;i<tempListOfExchanges.length; i++){
        const exchangeCode=tempListOfExchanges[i].Code
        const tickerList = await listOfTickers(exchangeCode)
        tempListofTickers = {...tempListofTickers, ...tickerList}
        
    }
    return(tempListofTickers)

}

module.exports={
    tickerListDownload
}