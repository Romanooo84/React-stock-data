import { liveData, historicalData } from "hooks/downloadData";
import { linearRegression } from "hooks/math";
import { createDate } from "hooks/createDate";
import { TickerData } from "./TickerData";
import tickers from '../data/ticers'
import css from '../styles/Chart.module.css'
import Select from 'react-select';
import { MdShowChart } from "react-icons/md";
import { Datepicker } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { useEffect, useState, useRef, useMemo } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Chart = ({chartTicker, chartName, addChartTicker, addChartName, setChartTicker, setAddChartTicker, secondChart, setSecondChart}) => {
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
    const [dataset, setDataset] = useState([]);
    const [isRegression, setIsRegression] = useState(false)
    const [datepickerOpen, setDatepickerOpen] = useState(false);
    
    const selectRef = useRef(null);

    const customStyles = useMemo(() => ({
        control: (provided, state) => ({
            ...provided,
            borderTop: 'none',
            borderBottom: 'none',
            borderLeft: '0px solid transparent',
            borderRight: '0px solid transparent',
            boxShadow: state.isFocused ? 'none' : 'none',
            '&:hover': {
                borderBottom: '2px solid blue', 
            },
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            display: 'none'
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none'
        })
    }), []);

    const startData = useMemo(() => [
        {
          label: `${ticker} - ${tickerName}`,
          data: yAxis,
          borderColor: 'blue',
          fill: false,
          borderWidth: 2,
          pointRadius: 0,
        },
      ], [ticker, tickerName, yAxis]);

    const onChange = (selectedOption) => {
       setTicker(selectedOption.value)   
       setTickerName(selectedOption.label)
       setSecondChart(false)
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
                borderWidth: 2,
                pointRadius: 0,
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
    },[startDate])

    useEffect(() => {
        if (chartTicker && startDate && endDate) {   
            setTicker(chartTicker)
            setTickerName(chartName)  
        }},[chartTicker, startDate, endDate, chartName, setChartTicker, ]
    )

    useEffect(() => {
        if (startDate !== null && endDate && ticker && secondChart === false) {
            setAddDownloadedHistoricalData([])
            setSecondChart(false)
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
                    console.log(false)
                }
            });
        }

        else if (startDate !== null && endDate && ticker && secondChart === true) {
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
        }
        }, [ticker, startDate, endDate, secondChart, setSecondChart]);


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

        if (startDate&&endDate&&addChartTicker!==null && secondChart===true){
        if(addDownloadedHistoricalData.length>0){
            return
        }
        else {
            historicalData(addChartTicker, startDate, endDate)
                .then(data => {
                    if (data) {
                        setAddDownloadedHistoricalData(data);
                    }
                });
            }
        }
        else if (startDate && endDate) {
            if (!isRegression) {
                setSecondChart(false)
                setDataset(startData)
                setAddYAxis()  
            }
            else if(isRegression&&chartTicker){
                setDataset(startData)
                setAddYAxis()  
                setChartTicker(null)
            }
            else if(isRegression&&!chartTicker){
                const tempRegYAxis=linearRegression(yAxis)
                const tempDataSet=[ {
                label: `Regression ${tickerName}`,
                data: tempRegYAxis,
                borderColor: 'red',
                fill: false,
                borderWidth: 2,
                pointRadius: 0,
            },]
          const newDataSet= [...startData, ...tempDataSet]
          setDataset(newDataSet)
          setAddYAxis()  
            }
        }
    }, [addChartTicker, startDate, endDate, tickerName, yAxis, startData, isRegression, chartTicker, setChartTicker, secondChart, setSecondChart, addDownloadedHistoricalData.length]);

    useEffect(() => {
        if (downloadedHistoricalData.length > 0 && downloadedLiveData.close) {
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
        else if (downloadedHistoricalData.length > 0 && !downloadedLiveData.close) {
                let tempXAxis = downloadedHistoricalData.map((axis) => axis.date);
                let tempYAxis = downloadedHistoricalData.map((axis) => axis.close);
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
                const tempData = {
                    labels: xAxis,
                    datasets: dataset
                };
            setChartData(tempData);
        }
    }, [xAxis, yAxis, ticker, dataset, isRegression]);

    useEffect(() => {
        setSearchTerm(search)
}, [search])

    useEffect(() => {
        if (searchTerm&&searchTerm.length>2){
        const results = tickers.filter(item => item.Name.toLowerCase().includes(searchTerm));    
        const options = results.map(item => ({
        value: item.Country==='USA'? `${item.Code}.US`:`${item.Code}.${item.Exchange}`,
        label: `${item.Name}`
        }));
        setOptions(options);}
    }, [searchTerm])

    useEffect(()=>{
        if (addYAxis&&dataset.length===1&&addChartName!==null && secondChart===false){
            const newDataSet= [...dataset, ...startData];
            setDataset(newDataSet)
            setAddYAxis()
            
        }
        if (addYAxis&&secondChart===true){
            
            const tempDataSet=[
                {
                    label: `${addChartTicker} - ${addChartName}$`,
                    data: addYAxis,
                    borderColor: 'green',
                    fill: false,
                    borderWidth: 2,
                    pointRadius: 0,
                },
            ]
            if (!isRegression){
            const newDataSet= [...startData, ...tempDataSet]
            setDataset(newDataSet)
            setAddYAxis()
            }
            else if (isRegression&&dataset.length<3&&!chartTicker){
            const newDataSet= [...dataset, ...tempDataSet]
            setDataset(newDataSet)
            setAddYAxis()
            } 
            else if (isRegression&&dataset.length===3&&!chartTicker){
                const filtredDataSet = dataset.filter(item => item.borderColor !== 'green');
                const newDataSet= [...filtredDataSet, ...tempDataSet]
                setDataset(newDataSet)
                setAddYAxis()
                } 
            else if (isRegression&&chartTicker){
                setChartTicker(null)   
                setDataset(startData)
                setAddYAxis()  
                } 
        }
    },[addYAxis, yAxis, dataset, addChartName, addChartTicker, startData, chartTicker, isRegression, setChartTicker, setAddChartTicker, secondChart, setSecondChart])


    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
    };

    return (
        <div className={css.mainDiv}>   
            <div className={css.slectDiv}>
                <Select className={css.slect} styles={customStyles} ref={selectRef} menuIsOpen={openMenu(ticker)} placeholder={ticker} value={{ label: `${ticker} - ${tickerName}`, value: ticker }} name={ticker} options={options} onChange={onChange} onInputChange={onInputChange} />
                <div className={css.dataDiv}>
                    <p>{parseFloat(downloadedLiveData.change_p).toFixed(2)}%</p>
                </div>
            </div>
            <TickerData downloadedHistoricalData={downloadedHistoricalData} downloadedLiveData={downloadedLiveData} endDate={endDate} />
            <div className={css.datepickerDiv}>
                <Datepicker className={css.datepicker} onOpen={() => setDatepickerOpen(true)} onClose={() => setDatepickerOpen(false)} placeholder={`${xAxis[0]} - ${xAxis[xAxis.length-1]}`} onChange={onDateChange} controls={['calendar']} select="range" touchUi={true} inputComponent="input" inputProps={{ id: 'startDate' }} max={new Date()}/>   
                {isRegression!==true?
                    (<button className={css.button} id='addRegression' name='button' onClick={onClick}><MdShowChart className={`${css.icon} ${css.iconAdd}`} /></button>):
                    (<button className={css.button} id='removeRegression' name='button' onClick={onClick}><MdShowChart className={`${css.icon} ${css.iconRemove}`}/></button>)
                    }
            </div>
            {chartData && <Line className={css.chart} options={chartOptions} data={chartData} />}
        </div>
    );
};
