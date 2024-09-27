import { useMemo } from "react";

// Nazwij funkcję od "use" aby była custom hookiem
export const useCustomStyles = () => {
  return useMemo(() => ({
    control: (provided, state) => ({
      ...provided,
      minHeight: 10,
      borderTop: 'none',
      borderBottom: '3px solid transparent',
      borderLeft: '0px solid transparent',
      borderRight: '0px solid transparent',
      boxShadow: state.isFocused ? 'none' : 'none',
      transition: `border-color 1.25s, transform 1s`,
      '&:hover': {
        borderBottom: '3px solid blue',
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
  }), []);
};
