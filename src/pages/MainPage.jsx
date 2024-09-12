import { Tickers } from '../components/Tickers';
import { Chart } from '../components/Chart';
import { News } from '../components/ShortNews';
import React,{ useState } from 'react';


export const  MainPage=()=>{

  const [chartTicker, setChartTicker] = useState(null);
  const [chartName, setChartName] = useState(null);
  const [addChartTicker, setAddChartTicker] = useState(null);
  const [addChartName, setAddChartName] = useState(null);
  const [secondChart, setSecondChart] = useState(false)

  return (
    <div>
      <Tickers setChartTicker={setChartTicker} setChartName={setChartName} setAddChartTicker={setAddChartTicker} setAddChartName={setAddChartName} addChartTicker={addChartTicker} setSecondChart={setSecondChart} secondChart={secondChart}/>
      <Chart chartTicker ={chartTicker} chartName={chartName} addChartTicker={addChartTicker} addChartName={addChartName} setChartTicker={setChartTicker} setAddChartTicker={setAddChartTicker} setSecondChart={setSecondChart} secondChart={secondChart}/>
      <News chartTicker ={chartTicker}/>
    </div>
  );
}

