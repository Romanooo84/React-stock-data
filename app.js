const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()
const cors = require('cors')
const logger = require('morgan')
const {historicalData, liveData, multipleData, newsData, NEOList, nearObjecDetails} = require('./server/downloads')
const {countCoorodinates } = require ('./server/opertations/coordinates')
const {tickerListDownload} = require ('./server/opertations/tickerListDownload')
const cron = require('node-cron');
//const {fetchMultiplyData}=require('./server/opertations/livedata')

const port = '3000' 



let asteroidData = []
let tickersList = []

//fetchMultiplyData()

const downloadCoorodinates = async ()=>{
  console.log('downloading coordinates')
  try {
    asteroidData = await countCoorodinates();
    console.log('coordinates downloaded')
    return
  } catch (error) {
    console.error("Error downloading coordinates:", error);
    return null
  }
}

const downloadTickerList = async()=>{
  console.log('downloading tickers list')
  try {
    tickersList = await tickerListDownload();
    console.log('ticker list downloaded')
    return tickersList 
  } catch (error) {
    console.error("Error downloading tickers list:", error);
    return null
  }
}




cron.schedule('0 0 * * *', () => {
  console.log('Rozpoczęcie pobierania danych o asteroidach o godzinie 00:00');
  downloadCoorodinates();
  downloadTickerList()
});

downloadTickerList()
downloadCoorodinates()


const corsOptions = {
  origin: ['https://www.romanpisarski.pl', 'http://localhost:5173', 'https://romanooo84.github.io'],
}

logger.format('custom', ':remote-addr :method :url :status :response-time ms');

app.use(cors(corsOptions))

app.use('/static', express.static(path.join(__dirname, 'build', 'static')));

app.use('/', express.static(path.join(__dirname, 'build')));

app.get('/historical', async (req, res) => {

  const queryParameters = req.query;
  const {ticker, from, to}= queryParameters

  try {

    const data = await historicalData(ticker, from, to);
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Wystąpił błąd przy pobieraniu danych historycznych' });
  }
});

app.get('/live', async (req, res) => {

  const queryParameters = req.query;
  const {ticker}= queryParameters

  try {
    const data = await liveData(ticker);
    res.json(data);
  } catch (error) {
    console.error("Błąd przy pobieraniu danych historycznych:", error);
    res.status(500).json({ error: 'Wystąpił błąd przy pobieraniu danych historycznych' });
  }
});

app.get('/multiple', async (req, res) => {

  const queryParameters = req.query;
  const {tickers}= queryParameters
  try {
    const data = await multipleData(tickers);
    res.json(data);
  } catch (error) {
    console.error("Błąd przy pobieraniu danych historycznych:", error);
    res.status(500).json({ error: 'Wystąpił błąd przy pobieraniu danych historycznych' });
  }
});

app.get('/news', async (req, res) => {

  const queryParameters = req.query;
  const {ticker, limit, from, to}= queryParameters
  try {
    const data = await newsData(ticker, limit, from, to);
    res.json(data);
  } catch (error) {
    console.error("Błąd przy pobieraniu danych historycznych:", error);
    res.status(500).json({ error: 'Wystąpił błąd przy pobieraniu danych historycznych' });
  }
});

app.get('/tickers', async (req, res) => {
  const tickers= require('./server/opertations/tickers.json')
  try {
    res.json(tickers);
  } catch (error) {
    console.error("Błąd przy pobieraniu danych historycznych:", error);
    res.status(500).json({ error: 'Wystąpił błąd przy pobieraniu danych historycznych' });
  }
});

app.get('/nasa/neodetails', async (req, res) => {

  const queryParameters = req.query;
  const {id, startDate, endDate}= queryParameters
  console.log('nasa')
  try {
    const data = await nearObjecDetails(id, startDate, endDate);
    res.json(data);
  } catch (error) {
    console.error("Błąd przy pobieraniu NEO:", error);
    res.status(500).json({ error: 'Wystąpił błąd przy pobieraniu danych NEO' });
  }
});

app.get('/nasa/neolist', async (req, res) => {

  const queryParameters = req.query;
  const {date}= queryParameters
  console.log('nasa')
  try {
    const data = await NEOList(date);
    res.json(data);
  } catch (error) {
    console.error("Błąd przy pobieraniu NEO:", error);
    res.status(500).json({ error: 'Wystąpił błąd przy pobieraniu danych NEO' });
  }
});

app.get('/nasa/test', async (req, res) => {
  try {
    const data = asteroidData
    res.json(data);
  } catch (error) {
    console.error("Błąd przy pobieraniu NEO:", error);
    res.status(500).json({ error: 'Wystąpił błąd przy pobieraniu danych NEO' });
  }
});



app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}/`);
});

