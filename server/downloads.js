const token = process.env.TOKEN;


const historicalData = async (ticker, startDate, endDate) => {
    const url = `https://eodhd.com/api/eod/${ticker}?from=${startDate}&to=${endDate}&period=d&api_token=${token}&fmt=json`;
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

const liveData= async (ticker)=>{
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
      const downloadedData = await response.json();
      return downloadedData;
    } catch (error) {
      console.error("Data error:", error);
      return null; 
    }
  };

  const multipleLiveData = async (data) => {
    
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

  const newsData = async (ticker, quanity, startDate, endDate)=>{
    const url= `https://eodhd.com/api/news?${ticker}S&from=${startDate}&to=${endDate}&offset=0&limit=${quanity}&api_token=${token}&fmt=json`
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log('bład')
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const downloadedData = await response.json();
      return downloadedData;
    } catch (error) {
      console.error("Data error:", error);
      return null; 
    }
  }

  const listOfExchanges = async ()=>{
    const url = `https://eodhd.com/api/exchanges-list/?api_token=${token}&fmt=json`
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log('bład')
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const downloadedData = await response.json();
      return downloadedData;
    } catch (error) {
      console.error("Data error:", error);
      return null; 
    }
  }

  const listOfTickers = async (exchange)=>{
    const url= `https://eodhd.com/api/exchange-symbol-list/${exchange}?api_token=${token}&fmt=json`
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log(response.status)
        return null
      }
      const downloadedData = await response.json();
      return downloadedData;
    } catch (error) {
      console.error("Data error:", error);
      return null; 
    }
  }


  const nearObjecDetails =async (objectId, startDate, endDate) =>{
    
    let url
   if (objectId === '399' || objectId === '301' || objectId === '199' || objectId === '299' || objectId === '599' || objectId === '699' || objectId === '799' || objectId === '899' || objectId === '499' || objectId === '10') {
  	url = `https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND=${objectId}&EPHEM_TYPE=VECTORS&CENTER=500@0&START_TIME=${startDate}&STOP_TIME=${endDate}&STEP_SIZE=1d&OUT_UNITS=AU-D&VEC_TABLE=2&REF_PLANE=ECLIPTIC`;
   } else {
  	url = `https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND='DES=${objectId}'&OBJ_DATA=%27YES%27&MAKE_EPHEM=%27YES%27&EPHEM_TYPE=%27VECTOR%27&CENTER=%27500@399%27&START_TIME=${startDate}&STOP_TIME=${endDate}&STEP_SIZE=%271%20d%27&QUANTITIES=%271,9,20,23,24,29%27`;
   }
    try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const downloadedData = await response.text();
      return downloadedData
      ; 
    } catch (error) {
        console.error("Data error:", error);
        return []
    }
  }

 const NEOList =async (date) =>{
    const url =`https://ssd-api.jpl.nasa.gov/cad.api?dist-max=3LD&date-min=${date}&sort=dist`
    try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const downloadedData = await response.json();
      return downloadedData
      ; 
    } catch (error) {
        console.error("Data error:", error);
        return []
    }
}
 const NEODetails =async (id) =>{
   const url = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=lN1IavfdnYKexgM5x9HxXfyiUhozAq5xXiLa7dsI`
    try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const downloadedData = await response.json();
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
    listOfExchanges,
    listOfTickers,
    nearObjecDetails,
    NEOList,
    NEODetails,
    multipleLiveData
    }