export const liveData= async (ticker)=>{
  const url= `https://romanpisarski.pl/live?ticker=${ticker}`
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

export const historicalData= async (ticker, startDate, endDate) => {
  const url = `https://romanpisarski.pl/historical?ticker=${ticker}&from=${startDate}&to=${endDate}`
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
      tickerList.push(`${data[i]}`);
  }
  const tickers = tickerList
  const url= `https://romanpisarski.pl/multiple?tickers=${tickers}`
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


export const newsData = async (ticker, quanity, startDate, endDate)=>{
  const url= `https://romanpisarski.pl/news?ticker=${ticker}&from=${startDate}&to=${endDate}&offset=0&limit=${quanity}`
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

export const tickers = async ()=>{
  const url = 'https://romanpisarski.pl/tickers'
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