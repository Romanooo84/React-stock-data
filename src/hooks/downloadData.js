
import {token} from './data'


  export const multiplyData = (data) => {
    let tickerList
    for (let i=0; i<data.length;i++){
        if (i===0){
            tickerList=[`${data[i]}?s=`]

        }
        else{
            tickerList.push(data[i])
        }
    }

    const tickers = tickerList.join('')
  
    fetch(`https://eodhd.com/api/real-time/${tickers}&api_token=${token}&fmt=json`)
    .then((response) => {
      return response.json()
      })
    .then ((data)=>{
      return(data)
    })
      .catch((error) => {
        console.error("Błąd danyc:", error);
      });
  }
