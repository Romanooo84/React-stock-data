const { listOfExchanges, listOfTickers } = require("../downloads")
const path = require('path');
const fs = require('fs');

const tickerListDownload = async () => {
    let tempListofTickers =[]
    const tempListOfExchanges = await listOfExchanges();
     tempListOfExchanges.push(
        {Code:'INDX'},
        {Type:'N/A'})
    
    for (let i = 0; i < tempListOfExchanges.length; i++) {
        const exchangeCode = tempListOfExchanges[i].Code;
        tickerList = await listOfTickers(exchangeCode);
        const count = Math.round((i / tempListOfExchanges.length) * 100)
        process.stdout.write("\r"+count+'%')
        tempListofTickers.push(tickerList) ;
    }
    tempListofTickers = tempListofTickers.flat()

    const updateFileWithNewData = (data) => {
      const filePath = path.join(__dirname, 'tickers.json'); 

      try {
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log('')
          console.log('Plik został zaktualizowany nowymi danymi.');
      } catch (err) {
          console.log('')
          console.error('Błąd przy zapisywaniu pliku:', err);
      }
    };
    updateFileWithNewData(tempListofTickers)

    return tempListofTickers;
};

module.exports = {
    tickerListDownload
};

