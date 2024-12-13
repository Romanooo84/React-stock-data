import { Tickers } from '../components/Tickers';
import { Chart } from '../components/Chart';
import { News } from '../components/ShortNews';
import css from '../styles/MainPage.module.css'
import {tickers} from '../hooks/downloadData'
import { useEffect, useState } from 'react';


export const  MainPage=()=>{
  const [download, setDownload] = useState([])

  
  useEffect(()=>{
    const data = async()=>{
      const fetch = await tickers()
      setDownload(fetch)

    }
    data()
  },[])

  useEffect(()=>{
    console.log(download)
  },[download])
  
  return (
    <div className={css.mainDiv}>
      <Tickers/>
      <Chart />
      <News Page={'mainPage'}/>
    </div>
  );
}

