import { Tickers } from '../components/Tickers';
import { Chart } from '../components/Chart';
import { News } from '../components/ShortNews';
import css from '../styles/MainPage.module.css'



export const  MainPage=()=>{


  return (
    <div className={css.mainDiv}>
      <Tickers/>
      <Chart />
      <News Page={'mainPage'}/>
    </div>
  );
}

