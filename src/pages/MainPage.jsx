import { Tickers } from '../components/Tickers';
import { Chart } from '../components/Chart';
import { News } from '../components/ShortNews';
import css from '../styles/MainPage.module.css'
import {tickers} from '../hooks/downloadData'
import { useEffect, useState } from 'react';
import { useData } from 'hooks/dataContext';


export const  MainPage=()=>{
  const { updateData } = useData();
  const [updated, setUpdated ] = useState(false)

  
  useEffect(() => {
    if (!updated) {
      const data = async () => {
        const fetch = await tickers()
        updateData({ tickers: fetch })
       
      }
       data()
       setUpdated(true)
      }
  },[updateData, updated, setUpdated])
  

  return (
    <div className={css.mainDiv}>
      <Tickers/>
      <Chart />
      <News Page={'mainPage'}/>
    </div>
  );
}

