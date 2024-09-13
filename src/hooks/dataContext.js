import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [Data, setData] = useState({
   
  });

  const updateData = (newData) => {
    setData(newData); 
  };

  return (
    <DataContext.Provider value={{ Data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};