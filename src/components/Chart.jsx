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

export const Chart = ({chartTicker, chartName, addChartTicker, addChartName}) => {
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [addYAxis, setAddYAxis]= useState([])
    const [downloadedHistoricalData, setDownloadedHistoricalData] = useState([]);
    const [addDownloadedHistoricalData, setAddDownloadedHistoricalData] = useState([]);
    //const [downloadedLiveData, setDownloadedLiveData] = useState([]);
    //const [addDownloadedLiveData, setAddDownloadedLiveData] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [ticker, setTicker] = useState('AAPL.US');
    const [tickerName, setTickerName]=useState('Apple INC')
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const selectRef = useRef(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState();
    const [dataset, setDataset] = useState([])


    useEffect(()=>{
        if (startDate===null){
        let beginigEndDate = new Date();
        let beginigstartDate = new Date(beginigEndDate);
        beginigstartDate.setDate(beginigstartDate.getDate() - 30);
        setStartDate(createDate(beginigstartDate))
        setEndDate(createDate(beginigEndDate))
        setDataset([
            {
                label: tickerName,
                data: yAxis,
                borderColor: 'blue',
                fill: false,
            },
        ],)
    }
    },[tickerName,yAxis, startDate])
    

    const onChange = (selectedOption) => {
       setTicker(selectedOption.value)   
       setTickerName(selectedOption.label)
    }

    const onDateChange = (selectedOption) => {
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

    useEffect(()=>{
        if (chartTicker&&startDate&&endDate){
            setTicker(chartTicker)
            setTickerName(chartName)  
        }},[chartTicker, startDate, endDate, chartName]
    )

    useEffect(() => {
        if (startDate!==null&& endDate && ticker){
        liveData(ticker)
            .then(data => {
                if (data) {
                    //setDownloadedLiveData(data);
                }
            });

        historicalData(ticker, startDate, endDate)
            .then(data => {
                if (data) {
                    setDownloadedHistoricalData(data);
                }
            });
    }}, [ticker, startDate, endDate, addChartTicker]);

    useEffect(() => {
        if (startDate&&endDate&&addChartTicker!=='none'&&addChartTicker!==undefined&&addChartTicker!==null){
        liveData(addChartTicker)
            .then(data => {
                if (data) {
                    //setAddDownloadedLiveData(data);
                }
            });

        historicalData(addChartTicker, startDate, endDate)
            .then(data => {
                if (data) {
                    setAddDownloadedHistoricalData(data);
                }
            });
        }
        else if(startDate&&endDate){
            const tempDataSet=[
                {
                    label: tickerName,
                    data: yAxis,
                    borderColor: 'blue',
                    fill: false,
                },
            ]
            setDataset(tempDataSet)
            setAddYAxis()   
        }
    }, [addChartTicker, startDate, endDate, tickerName, yAxis]);

    useEffect(() => {
        
        if (downloadedHistoricalData) {
            const tempXAxis = downloadedHistoricalData.map((axis) => axis.date);
            const tempYAxis = downloadedHistoricalData.map((axis) => axis.close);
            setXAxis(tempXAxis);
            setYAxis(tempYAxis);
        }
    }, [downloadedHistoricalData]);

    useEffect(() => {
        if (addDownloadedHistoricalData.length>0) {
            const tempYAxis = addDownloadedHistoricalData.map((axis) => axis.close);
            setAddYAxis(tempYAxis);
        }
    }, [addDownloadedHistoricalData]);

    useEffect(() => {
        if (xAxis.length > 0 && yAxis.length > 0 && ticker && dataset) {
            const tempData = {
                labels: xAxis,
                datasets: dataset
            };
            setChartData(tempData);
        }
    }, [xAxis, yAxis, ticker, tickerName, dataset]);

    useEffect(() => {
        setSearchTerm(search)
}, [search])

    useEffect(() => {
        if (searchTerm&&searchTerm.length>2){
        const results = tickers.filter(item => item.Name.toLowerCase().includes(searchTerm));    
        const options = results.map(item => ({
        value: item.Country==='USA'? `${item.Code}.US`:`${item.Code}.${item.Exchange}`,
        label: `${item.Code}-${item.Name}`
        }));
        setOptions(options);}
    }, [searchTerm])

    useEffect(()=>{
        if (addYAxis&&dataset.length===1&&addChartName!==null){
            const tempDataSet=[
                {
                    label: addChartName,
                    data: addYAxis,
                    borderColor: 'green',
                    fill: false,
                },
            ]
            const newDataSet= [...dataset, ...tempDataSet];
            setDataset(newDataSet)
            setAddYAxis()
        }
        if (addYAxis&&dataset.length>1){
            const tempDataSet=[
                {
                    label: tickerName,
                    data: yAxis,
                    borderColor: 'blue',
                    fill: false,
                },
                {
                    label: addChartName,
                    data: addYAxis,
                    borderColor: 'green',
                    fill: false,
                },
            ]
            setDataset(tempDataSet)
            setAddYAxis()
        }
    },[addYAxis,yAxis, dataset, addChartName, tickerName])


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
