const token = process.env.TOKEN;

const historicalData = async (ticker, startDate, endDate) => {
    const url = `https://eodhd.com/api/eod/${ticker}?from=${startDate}&to=${endDate}&period=d&api_token=${token}&fmt=json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const downloadedData = await response;
      return downloadedData;
    } catch (error) {
      console.error("Data error:", error);
      return null; 
    }
  };

const liveData= async (ticker)=>{
    const url= `https://eodhd.com/api/real-time/${ticker}?api_token=${token}&fmt=json`
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const downloadedData = await response;
      return downloadedData;
    } catch (error) {
      console.error("Data error:", error);
      return null; 
    }
  
  }

const multipleData = async (data) => {
    const tempData=data.split(',')
    let tickerList = [];
    for (let i = 0; i < tempData.length; i++) {
      if (i === 0) {
        tickerList = [`${tempData[i]}?s=`];
      } else if (i === 1)  {
        tickerList.push(`${tempData[i]}`);
      }
      else {
        tickerList.push(`,${tempData[i]}`);
      }
    }
    const tickers = tickerList.join('');
    const url= `https://eodhd.com/api/real-time/${tickers}&api_token=${token}&fmt=json`
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const downloadedData = await response;
      return downloadedData;
    } catch (error) {
      console.error("Data error:", error);
      return null; 
    }
  };

  const newsData = async (ticker, quanity, startDate, endDate)=>{
    const url= `https://eodhd.com/api/news?${ticker}S&from=${startDate}&to=${endDate}&offset=0&limit=${quanity}&api_token=${token}&fmt=json`
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const downloadedData = await response;
      return downloadedData;
    } catch (error) {
      console.error("Data error:", error);
      return null; 
    }
  
  }

  module.exports = {
    historicalData,
    liveData, 
    multipleData, 
    newsData
    }