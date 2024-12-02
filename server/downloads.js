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
        console.log('bład')
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const downloadedData = await response;
      return downloadedData;
    } catch (error) {
      console.error("Data error:", error);
      return null; 
    }
  
  }

 const nearObjecDetails =async (objectId, startDate, endDate) =>{
    const url =`https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND='${objectId}'&EPHEM_TYPE=VECTORS&CENTER=500@0&START_TIME=${startDate}&STOP_TIME=${endDate}&STEP_SIZE=1d&OUT_UNITS=KM-S&VEC_TABLE=2&REF_PLANE=ECLIPTIC`
    console.log(url)
    try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const downloadedData = await response.text();
      console.log(downloadedData)
      return downloadedData
      ; 
    } catch (error) {
        console.error("Data error:", error);
        return []
    }
  }

 const NEOList =async (date) =>{
    const url =`https://ssd-api.jpl.nasa.gov/cad.api?dist-max=0.1LD&date-min=${date}&sort=dist`
    console.log(url)
    try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const downloadedData = await response.json();
      console.log(downloadedData)
      return downloadedData
      ; 
    } catch (error) {
        console.error("Data error:", error);
        return []
    }
  }


  module.exports = {
    historicalData,
    liveData, 
    multipleData, 
    newsData,
    nearObjecDetails,
    NEOList
    }