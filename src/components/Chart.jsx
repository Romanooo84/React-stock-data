import { liveData, historicalData } from "hooks/downloadData";
import { linearRegression } from "hooks/math";
import { createDate } from "hooks/createDate";
import { TickerData } from "./TickerData";
import tickers from '../data/ticers'
import Select from 'react-select';
import { Datepicker } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { useEffect, useState, useRef, useMemo } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Chart = ({chartTicker, chartName, addChartTicker, addChartName}) => {
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [addYAxis, setAddYAxis]= useState([])
    const [downloadedHistoricalData, setDownloadedHistoricalData] = useState([]);
    const [addDownloadedHistoricalData, setAddDownloadedHistoricalData] = useState([]);
    const [downloadedLiveData, setDownloadedLiveData] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [ticker, setTicker] = useState('AAPL.US');
    const [tickerName, setTickerName]=useState('Apple INC')
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState();
    const [dataset, setDataset] = useState([])
    const [isRegression, setIsRegression] = useState(false)
    const [datepickerOpen, setDatepickerOpen] = useState(false);
    const selectRef = useRef(null);

    const startData = useMemo(() => [
        {
          label: tickerName,
          data: yAxis,
          borderColor: 'blue',
          fill: false,
        },
      ], [tickerName, yAxis]);

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

    const onClick=(e)=>{
        if(e.target.id==='addRegression'){
            setIsRegression(true)
            const tempRegYAxis=linearRegression(yAxis)
            const tempDataSet=[ {
                label: `Regression ${tickerName}`,
                data: tempRegYAxis,
                borderColor: 'red',
                fill: false,
            },]
          const newDataSet= [...dataset, ...tempDataSet]
          setDataset(newDataSet)
        }
        else{
            setIsRegression(false)
            const tempDataset = dataset.filter(item => !item.label.toLowerCase().includes('regression'));
            setDataset(tempDataset)
        }
    }

    useEffect(()=>{
        if (startDate===null){
        let beginigEndDate = new Date();
        let beginigstartDate = new Date(beginigEndDate);
        beginigstartDate.setDate(beginigstartDate.getDate() - 30);
        setStartDate(createDate(beginigstartDate))
        setEndDate(createDate(beginigEndDate))
    }
    },[tickerName, startDate])

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
                    setDownloadedLiveData(data);
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
        const intervalID = setInterval(() => {
            liveData(ticker)
            .then(data => {
                if (data && !datepickerOpen) {
                    setDownloadedLiveData(data)
                }
            });
        }, 2500);
    
        return () => clearInterval(intervalID);
    }, [ticker, datepickerOpen]);
    

    useEffect(() => {
        if (startDate&&endDate&&addChartTicker!=='none'&&addChartTicker!==undefined&&addChartTicker!==null){
        historicalData(addChartTicker, startDate, endDate)
            .then(data => {
                if (data) {
                    setAddDownloadedHistoricalData(data);
                }
            });
        }
        else if(startDate&&endDate){
            setDataset(startData)
            setAddYAxis()   
        }
    }, [addChartTicker, startDate, endDate, tickerName, yAxis, startData]);

    useEffect(() => {
        
        if (downloadedHistoricalData.length > 0 && downloadedLiveData.code) {
            let tempXAxis = downloadedHistoricalData.map((axis) => axis.date);
            let tempYAxis = downloadedHistoricalData.map((axis) => axis.close);
            const tempDate = new Date(downloadedLiveData.timestamp * 1000);
            const formattedDate = tempDate.toISOString().split('T')[0];  
            if(formattedDate===endDate){
                    const close = downloadedLiveData.close
                    tempXAxis.push(formattedDate)
                    tempYAxis.push(close)
                }
            setXAxis(tempXAxis);
            setYAxis(tempYAxis);
        }
    }, [downloadedHistoricalData, downloadedLiveData, endDate]);

    useEffect(() => {
        if (addDownloadedHistoricalData.length>0) {
            const tempYAxis = addDownloadedHistoricalData.map((axis) => axis.close);
            setAddYAxis(tempYAxis);
        }
    }, [addDownloadedHistoricalData]);

    useEffect(() => {
        if (xAxis.length > 0 && yAxis.length > 0 && ticker && dataset) {
            console.log('render xAxis')
            if (isRegression === false){
                const tempData = {
                    labels: xAxis,
                    datasets: dataset
                };
            setChartData(tempData);
            }
            else {
                
            }
        }
    }, [xAxis, yAxis, ticker, tickerName, dataset, isRegression]);

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
            const newDataSet= [...dataset, ...startData];
            setDataset(newDataSet)
            setAddYAxis()
        }
        if (addYAxis&&dataset.length>1){
            const tempDataSet=[
                {
                    label: addChartName,
                    data: addYAxis,
                    borderColor: 'green',
                    fill: false,
                },
            ]
            const newDataSet= [...startData, ...tempDataSet]
            setDataset(newDataSet)
            setAddYAxis()
        }
    },[addYAxis, yAxis, dataset, addChartName, tickerName, startData])


    const chartOptions = {};

    return (
        <div>
            <Select ref={selectRef}  menuIsOpen={openMenu(ticker)} placeholder={ticker} name={ticker} options={options} onChange={onChange} onInputChange={onInputChange} />
            <div>
                <p>Change: {downloadedLiveData.change_p}%</p>
                <p>Close: {downloadedLiveData.close}</p>
            </div>
            <Datepicker onOpen={() => setDatepickerOpen(true)} onClose={() => setDatepickerOpen(false)}  onChange={onDateChange} controls={['calendar']} select="range" touchUi={true} inputComponent="input" inputProps={{ id: 'startDate' }}/>   
            {isRegression!==true?
                (<button id='addRegression' name='button' onClick={onClick}>Add regression</button>):
                (<button id='removeRegression' name='button' onClick={onClick}>Remove regression</button>)
            }
            <TickerData downloadedHistoricalData={downloadedHistoricalData} downloadedLiveData={downloadedLiveData} endDate={endDate} />
            {chartData && <Line options={chartOptions} data={chartData} />}
        </div>
    );
};
