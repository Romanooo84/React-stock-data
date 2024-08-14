import axios from 'axios';
import {token} from './data'

const baseApi = axios.create({
    baseURL: "https://eodhd.com/api"
  });

  export const multiplyData = (data) => {
    let tickerList
    for (let i=0; data.length<i;i++){
        if (i===0){
            tickerList=[`${data[i]}?s=`]
        }
        else{
            tickerList.push(data[i])
        }
    }

    console.log(token)
    
    fetch(`https://eodhd.com/api/eod/MCD.US?api_token=${token}&fmt=json`)
    .then((response) => {
      return response.json()
      })
    .then ((data)=>{
      console.log(data)
    })
      .catch((error) => {
        console.error("Błąd danyc:", error);
      });
  }