import { token } from './data';

export const liveData= async (ticker)=>{
  const url= `https://eodhd.com/api/real-time/${ticker}?api_token=${token}&fmt=json`
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const downloadedData = await response.json();
    return downloadedData;
  } catch (error) {
    console.error("Data error:", error);
    return null; 
  }

}

export const historicalData = async (ticker, startDate, endDate) => {
  const url = `https://eodhd.com/api/eod/${ticker}?from=${startDate}&to=${endDate}&period=d&api_token=${token}&fmt=json`
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const downloadedData = await response.json();
    return downloadedData;
  } catch (error) {
    console.error("Data error:", error);
    return null; 
  }

}

export const multiplyData = async (data) => {
  let tickerList = [];
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      tickerList = [`${data[i]}?s=`];
    } else if (i === 1)  {
      tickerList.push(`${data[i]}`);
    }
    else {
      tickerList.push(`,${data[i]}`);
    }
  }
  const tickers = tickerList.join('');
  const url= `https://eodhd.com/api/real-time/${tickers}&api_token=${token}&fmt=json`
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const downloadedData = await response.json();
    return downloadedData;
  } catch (error) {
    console.error("Data error:", error);
    return null; 
  }
};

export const getExchanges = async () => {
 
  try {
    const response = await fetch(`https://eodhd.com/api/exchanges-list/?api_token=${token}&fmt=json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const downloadedData = await response.json();
    return downloadedData;
  } catch (error) {
    console.error("Data error:", error);
    return null; 
  }
};

export const getTickers = async (data) => {
  let ticerList = []
 for (let i=0; i<data.length;i++){
  try {
    const response = await fetch(`https://eodhd.com/api/exchange-symbol-list/${data[i].Code}?api_token=${token}&fmt=json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const downloadedData = await response.json();
    ticerList=[...ticerList,...downloadedData]
  } catch (error) {
    console.error("Data error:", error);
  }}
  return(ticerList)
};

export const newsData = async (ticker, quanity, startDate, endDate)=>{
  const url= `https://eodhd.com/api/news?${ticker}S&from=${startDate}&to=${endDate} &offset=0&limit=${quanity}&api_token=${token}&fmt=json`
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const downloadedData = await response.json();
    return downloadedData;
  } catch (error) {
    console.error("Data error:", error);
    return null; 
  }

}
