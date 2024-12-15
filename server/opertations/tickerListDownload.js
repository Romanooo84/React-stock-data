const { listOfExchanges, listOfTickers } = require("../downloads")
const path = require('path');
const fs = require('fs');

const tickerListDownload = async () => {
    let tempListofTickers =[]
    const tempListOfExchanges = await listOfExchanges();
     tempListOfExchanges.push(
        {Code:'INDX'},
        {Type:'N/A'})

    console.log(tempListOfExchanges)
    
    for (let i = 0; i < tempListOfExchanges.length; i++) {
        const exchangeCode = tempListOfExchanges[i].Code;
        tickerList = await listOfTickers(exchangeCode);
        console.log(i / tempListOfExchanges.length * 100 + '%')
        tempListofTickers.push(tickerList) ; // Merge arrays
    }
    tempListofTickers = tempListofTickers.flat()
    const updateFileWithNewData = (data) => {
      const filePath = path.join(__dirname, 'tickers.json'); // Ścieżka do pliku
      
      // Zamiana obiektu na JSON i zapisanie do pliku
      try {
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log('Plik został zaktualizowany nowymi danymi.');
      } catch (err) {
          console.error('Błąd przy zapisywaniu pliku:', err);
      }
    };
    updateFileWithNewData(tempListofTickers)

    return tempListofTickers;
};

module.exports = {
    tickerListDownload
};

