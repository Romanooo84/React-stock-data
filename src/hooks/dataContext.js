import { aspectRatio } from 'data/chartOptions';
import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [Data, setData] = useState({});

  const updateData = (newData) => {
    setData((prevData) => ({
      ...prevData,         
      ...newData           
    }));
  };

  useEffect(() => {
    updateData({
      historicalData: [],
      liveData: [],
      endDate: null,
      startDate: null,
      isLoading: true,
      newChart: true,
      ticker: null,
      tickerName:null,
      chartName: null,
      chartTicker: null,
      isRegression: false,
      isSecondChart: false,
      secondChartName: null,
      secondChartTicker: null,
      isDatepickerOpen: false,
      isStartPage: true,
      multiplyList: [],
      tickersHistoricalList:[],
      aspectRatio:null
    });
  }, []);

  return (
    <DataContext.Provider value={{ Data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};