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
import { useData } from "hooks/dataContext";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Chart = () => {
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [addYAxis, setAddYAxis]= useState([])
    const [downloadedHistoricalData, setDownloadedHistoricalData] = useState([]);
    const [addDownloadedHistoricalData, setAddDownloadedHistoricalData] = useState([]);
    const [downloadedLiveData, setDownloadedLiveData] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [ticker] = useState('AAPL.US');
    const [tickerName]=useState('Apple INC')
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const [dataset, setDataset] = useState([]);
    const { Data, updateData } = useData();
    
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
          label: `${Data.ticker} - ${Data.tickerName}`,
          data: yAxis,
          borderColor: 'blue',
          fill: false,
          borderWidth: 2,
          pointRadius: 0,
        },
      ], [yAxis,Data.ticker,Data.tickerName]);

    const onChange = (selectedOption) => {
       updateData({
        ticker:selectedOption.value,
        tickerName:selectedOption.label,
        isSecondChart: false,
        newChart:true
       })
    }

    const onDateChange = (selectedOption) => {
        const startDate=createDate(selectedOption.value[0])
        const endDate = createDate(selectedOption.value[1])
         updateData(
            startDate,
            endDate
         )
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
            updateData(
                {isRegression:true
            })
            const tempRegYAxis=linearRegression(yAxis)
            const tempDataSet=[ {
                label: `Regression ${Data.tickerName}`,
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
            updateData(
                {isRegression:false
            })
            const tempDataset = dataset.filter(item => !item.label.toLowerCase().includes('regression'));
            setDataset(tempDataset)
        }
    }

    useEffect(()=>{
        if (Data.startDate===null){
        let beginigEndDate = new Date();
        let beginigstartDate = new Date(beginigEndDate);
        beginigstartDate.setDate(beginigstartDate.getDate() - 30);
        updateData({
            ticker: ticker,
            tickerName:tickerName,
            startDate:createDate(beginigstartDate),
            endDate: createDate(beginigEndDate),
            newChart:true
        })
    }
    }, [ticker,tickerName,updateData,Data.startDate])

    useEffect(()=>{
    if (Data.isStartPage){
        updateData(
            {
                newChart:true,
            })
    }},[Data.isStartPage, updateData])


    useEffect(() => {
        if (Data.isSecondChart === false && Data.newChart===true && Data.ticker!==null) {
            updateData({
                chartTicker: null,
                newChart: false
            })
            setAddDownloadedHistoricalData([])
            let live=[]
            let historical=[]
            historicalData(Data.ticker, Data.startDate, Data.endDate)
                .then(data => {
                    if (data) {
                        historical=data
                        setDownloadedHistoricalData(data);
                        liveData(Data.ticker)
                            .then(data => {
                                if (data) {
                                    live=data
                                    setDownloadedLiveData(data);
                                    updateData({
                                        historicalData:historical,
                                        liveData:live,
                                        newChart:false,
                                    })
                                }
                            });
                    }
                });
        }

        else if (Data.isSecondChart === true && Data.newChart===true && Data.ticker!==null) {
            updateData({newChart:false})
            liveData(Data.ticker)
                .then(data => {
                    if (data) {
                        setDownloadedLiveData(data);
                    }
                });

        historicalData(Data.ticker, Data.startDate, Data.endDate)
            .then(data => {
                if (data) {
                    setDownloadedHistoricalData(data);
                }
            });
        }
        }, [Data.endDate, Data.isSecondChart, Data.secondChart, Data.startDate, Data.ticker, updateData, Data.newChart]);


    useEffect(() => {
        const intervalID = setInterval(() => {
            liveData(Data.ticker)
            .then(data => {
                if (data && !Data.isDatepickerOpen) {
                    setDownloadedLiveData(data)
                }
            });
        }, 5000);
    
        return () => clearInterval(intervalID);
    }, [Data.ticker, Data.isDatepickerOpen]);
    
    useEffect(() => {
        if (Data.secondChartTicker!==null && Data.isSecondChart===true){
            historicalData(Data.secondChartTicker, Data.startDate, Data.endDate)
                .then(data => {
                    if (data) {
                        setAddDownloadedHistoricalData(data);
                    }
                });
            }
        else if (Data.startDate && Data.isSecondChart===false) {
            if (!Data.isRegression) {
                setDataset(startData)
                setAddYAxis()  
            }
            else if(Data.isRegression&&Data.chartTicker!==null){
                setDataset(startData)
                setAddYAxis()  
                updateData(
                    {chartTicker: null}
                )
            }
            else if(Data.isRegression&&Data.chartTicker===null){
                const tempRegYAxis=linearRegression(yAxis)
                const tempDataSet=[ {
                label: `Regression ${Data.tickerName}`,
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
    }, [Data, Data.chartTicker, Data.isRegression, Data.isSecondChart, Data.secondChartTicker, Data.startDate, Data.tickerName, startData, updateData, yAxis]);

    useEffect(() => {
        if (downloadedHistoricalData.length > 0 && downloadedLiveData.close) {
            let tempXAxis = downloadedHistoricalData.map((axis) => axis.date);
            let tempYAxis = downloadedHistoricalData.map((axis) => axis.close);
            const tempDate = new Date(downloadedLiveData.timestamp * 1000);
            const formattedDate = tempDate.toISOString().split('T')[0];  
            if(formattedDate===Data.endDate){
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
    }, [downloadedHistoricalData, downloadedLiveData, Data.endDate]);

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
    }, [xAxis, yAxis, ticker, dataset]);

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
        if (addYAxis&&dataset.length===1&&Data.SecondChartName!==null && Data.isSecondChart===false){
            const newDataSet= [...dataset, ...startData];
            setDataset(newDataSet)
            setAddYAxis()
            
        }
        if (addYAxis&&Data.isSecondChart===true){
            
            const tempDataSet=[
                {
                    label: `${Data.SecondChartTicker} - ${Data.DataSecondChartName}$`,
                    data: addYAxis,
                    borderColor: 'green',
                    fill: false,
                    borderWidth: 2,
                    pointRadius: 0,
                },
            ]
            if (!Data.isRegression){
            const newDataSet= [...startData, ...tempDataSet]
            setDataset(newDataSet)
            setAddYAxis()
            }
            else if (Data.isRegression&&dataset.length<3&&!Data.chartTicker){
            const newDataSet= [...dataset, ...tempDataSet]
            setDataset(newDataSet)
            setAddYAxis()
            } 
            else if (Data.isRegression&&dataset.length===3&&!Data.chartTicker){
                const filtredDataSet = dataset.filter(item => item.borderColor !== 'green');
                const newDataSet= [...filtredDataSet, ...tempDataSet]
                setDataset(newDataSet)
                setAddYAxis()
                } 
            else if (Data.isRegression&&Data.chartTicker){
                setDataset(startData)
                setAddYAxis()  
                updateData(
                    {chartTicker:null}
                )
                } 
        }
    },[updateData,addYAxis, yAxis, dataset, startData,  Data.isRegression, Data.DataSecondChartName, Data.SecondChartName, Data.SecondChartTicker, Data.chartTicker, Data.isSecondChart])


    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
    };

    return (
        <div className={css.mainDiv}>   
            <div className={css.slectDiv}>
                <Select className={css.slect} styles={customStyles} ref={selectRef} menuIsOpen={openMenu(Data.ticker)} placeholder={Data.ticker} value={{ label: `${Data.ticker} - ${Data.tickerName}`, value: Data.ticker }} name={Data.ticker} options={options} onChange={onChange} onInputChange={onInputChange} />
                <div className={css.dataDiv}>
                    <p>{parseFloat(downloadedLiveData.change_p).toFixed(2)}%</p>
                </div>
            </div>
            <TickerData downloadedHistoricalData={downloadedHistoricalData} downloadedLiveData={downloadedLiveData} endDate={Data.endDate} />
            <div className={css.datepickerDiv}>
                <Datepicker className={css.datepicker} onOpen={() => updateData({ isDatepicerOpne: true })} onClose={() => updateData({ isDatepicerOpne: false})} placeholder={`${xAxis[0]} - ${xAxis[xAxis.length-1]}`} onChange={onDateChange} controls={['calendar']} select="range" touchUi={true} inputComponent="input" inputProps={{ id: 'startDate' }} max={new Date()}/>   
                {Data.isRegression!==true?
                    (<button className={css.button} id='addRegression' name='button' onClick={onClick}><MdShowChart className={`${css.icon} ${css.iconAdd}`} /></button>):
                    (<button className={css.button} id='removeRegression' name='button' onClick={onClick}><MdShowChart className={`${css.icon} ${css.iconRemove}`}/></button>)
                    }
            </div>
            {chartData && <Line className={css.chart} options={chartOptions} data={chartData} />}
        </div>
    );
};
