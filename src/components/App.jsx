import {multiplyData} from '../hooks/downloadData'

export const App = () => {

  const data = ['AAPL.US', 'EUR.FOREX']

  multiplyData(data)
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
    </div>
  );
};
