import { Tickers } from '../components/Tickers';
import { Chart } from '../components/Chart';
import { News } from '../components/ShortNews';



export const  MainPage=()=>{


  return (
    <div>
      <Tickers/>
      <Chart />
      <News/>
    </div>
  );
}

