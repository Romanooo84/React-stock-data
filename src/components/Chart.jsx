import { liveData, historicalData } from "hooks/downloadData";
import { createDate } from "hooks/createDate";
import tickers from '../data/ticers'
import Select from 'react-select';
import { Datepicker } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { useEffect, useState, useRef } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Chart = () => {
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [downloadedHistoricalData, setDownloadedHistoricalData] = useState([]);
    const [downloadedLiveData, setDownloadedLiveData] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [ticker, setTicker] = useState('AAPL.US')
    const [search, setSearch] = useState()
    const [searchTerm, setSearchTerm]=useState()
    const [options, setOptions] = useState([]);
    const selectRef = useRef(null);
    const [startDate, setStartDate]=useState()
    const [endDate, setEndDate]=useState()

    useEffect(()=>{
        setStartDate(new Date()-30)
        setEndDate(new Date())},[])
    

    const onChange = (selectedOption) => {
       setTicker(selectedOption.value)   
    }

    const onDateChange = (selectedOption) => {
        console.log(selectedOption.value)
        const startDate=createDate(selectedOption.value[0])
        const endDate = createDate(selectedOption.value[1])
         setStartDate(startDate)
         setEndDate(endDate )
     }

    const onInputChange = (event) => {
        setSearch(event.toLowerCase())
    }

    const openMenu=(index)=>{
        if ((search && search.length > 2) && selectRef.current === index) {
            return true;
        } else if ((search && search.length <3)||!search) {
            return false;
        }
    }

    useEffect(() => {
        if (startDate&&endDate){
            
        liveData(ticker)
            .then(data => {
                if (data) {
                    setDownloadedLiveData(data);
                }
            });

        historicalData(ticker, startDate, endDate)
            .then(data => {
                if (data) {
                    setDownloadedHistoricalData(data);
                }
            });
    }}, [ticker, startDate, endDate]);

    useEffect(() => {
        if (downloadedHistoricalData && downloadedLiveData ) {
            const tempXAxis = downloadedHistoricalData.map((axis) => axis.date);
            const tempYAxis = downloadedHistoricalData.map((axis) => axis.close);
            setXAxis(tempXAxis);
            setYAxis(tempYAxis);
        }
    }, [downloadedHistoricalData, downloadedLiveData]);

    useEffect(() => {
        if (xAxis.length > 0 && yAxis.length > 0) {
            const tempData = {
                labels: xAxis,
                datasets: [
                    {
                        label: ticker,
                        data: yAxis,
                        borderColor: 'blue',
                        fill: false,
                    },
                ],
            };
            setChartData(tempData);
        }
    }, [xAxis, yAxis, ticker]);

    useEffect(() => {
        setSearchTerm(search)
}, [search])

    useEffect(() => {
        if (searchTerm&&searchTerm.length>2){
        const results = tickers.filter(item => item.Name.toLowerCase().includes(searchTerm));    
        const options = results.map(item => ({
        value: item.Country==='US'? `${item.Code}.US`:`${item.Code}.${item.Exchange}`,
        label: `${item.Code}-${item.Name}`
        }));
        setOptions(options);}
    }, [searchTerm])

    useEffect(()=>{
    },[options])


    const chartOptions = {};

    return (
        <div>
            <Select ref={selectRef}  menuIsOpen={openMenu(ticker)} placeholder={ticker} name={ticker} options={options} onChange={onChange} onInputChange={onInputChange} />
            <Datepicker
                onChange={onDateChange}
                controls={['calendar']}
                select="range"
                touchUi={true}
                inputComponent="input"
                inputProps={'startDate'}
            />     
            {chartData && <Line options={chartOptions} data={chartData} />}
        </div>
    );
};
