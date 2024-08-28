import { Tickers } from './Tickers';
import { Chart } from './Chart';
import React,{ useState } from 'react';

export const App = () => {

  const [chartTicker, setChartTicker] = useState(null);
  const [chartName, setChartName] = useState(null);
  return (
    <div>
      <Tickers setChartTicker={setChartTicker} setChartName={setChartName}/>
      <Chart chartTicker ={chartTicker} chartName={chartName}/>
    </div>
  );
};