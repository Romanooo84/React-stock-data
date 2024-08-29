import { Tickers } from './Tickers';
import { Chart } from './Chart';
import React,{ useState } from 'react';

export const App = () => {

  const [chartTicker, setChartTicker] = useState(null);
  const [chartName, setChartName] = useState(null);
  const [addChartTicker, setAddChartTicker] = useState(null);
  const [addChartName, setAddChartName] = useState(null);
  return (
    <div>
      <Tickers setChartTicker={setChartTicker} setChartName={setChartName} setAddChartTicker={setAddChartTicker} setAddChartName={setAddChartName}/>
      <Chart chartTicker ={chartTicker} chartName={chartName} addChartTicker={addChartTicker} addChartName={addChartName}/>
    </div>
  );
};