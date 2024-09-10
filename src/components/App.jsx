import { Tickers } from './Tickers';
import { Chart } from './Chart';
import { News } from './news';
import React,{ useState } from 'react';
import css from '../styles/App.module.css'

export const App = () => {

  const [chartTicker, setChartTicker] = useState(null);
  const [chartName, setChartName] = useState(null);
  const [addChartTicker, setAddChartTicker] = useState(null);
  const [addChartName, setAddChartName] = useState(null);
  const [secondChart, setSecondChart] = useState(false)

  return (
    <div className={css.main}>
      <Tickers setChartTicker={setChartTicker} setChartName={setChartName} setAddChartTicker={setAddChartTicker} setAddChartName={setAddChartName} addChartTicker={addChartTicker} setSecondChart={setSecondChart} secondChart={secondChart}/>
      <Chart chartTicker ={chartTicker} chartName={chartName} addChartTicker={addChartTicker} addChartName={addChartName} setChartTicker={setChartTicker} setAddChartTicker={setAddChartTicker} setSecondChart={setSecondChart} secondChart={secondChart}/>
      <News chartTicker ={chartTicker}/>
    </div>
  );
};