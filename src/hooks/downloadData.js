import { token } from './data';

export const multiplyData = async (data) => {
  let tickerList = [];
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      tickerList = [`${data[i]}?s=`];
    } else {
      tickerList.push(data[i]);
    }
  }

  const tickers = tickerList.join('');

  try {
    const response = await fetch(`https://eodhd.com/api/real-time/${tickers}&api_token=${token}&fmt=json`);
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

