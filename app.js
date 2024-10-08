const express = require('express');
const path = require('path');
const app = express();
const port = '3000' // Możesz ustawić inny port, jeśli chcesz

const token = '65fd2d716aebf2.80647901'; // Twój token

const historicalData = async (ticker, startDate, endDate) => {
  const url = `https://eodhd.com/api/eod/${ticker}?from=${startDate}&to=${endDate}&period=d&api_token=${token}&fmt=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const downloadedData = await response.json();
    return downloadedData;
  } catch (error) {
    console.error("Data error:", error);
    return null; 
  }
};

// Serwowanie plików statycznych z katalogu 'build/static' pod ścieżką '/React-stock-data/static'
app.use('/React-stock-data/static', express.static(path.join(__dirname, 'build', 'static')));

// Serwowanie plików statycznych z katalogu 'build' pod ścieżką '/React-stock-data'
app.use('/React-stock-data', express.static(path.join(__dirname, 'build')));

app.get('/listen', async (req, res) => {
  console.log("otrzymałem zapytanie");

  // Odczytanie parametrów zapytania
  const queryParameters = req.query;

  try {
    // Przykładowe wywołanie funkcji historicalData
    const data = await historicalData('AAPL.US', '20-08-2024', '23-08-2024');

    // Tworzenie obiektu z danymi do wysłania w odpowiedzi
    const responseData = {
      query: queryParameters,
      historicalData: data
    };

    // Wysłanie odpowiedzi
    res.json(responseData);
  } catch (error) {
    console.error("Błąd przy pobieraniu danych historycznych:", error);
    res.status(500).json({ error: 'Wystąpił błąd przy pobieraniu danych historycznych' });
  }
});


// Wszystkie inne ścieżki mają zwracać index.html z Reacta
app.get('/React-stock-data/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}/React-stock-data/`);
});
