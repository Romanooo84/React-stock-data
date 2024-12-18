import { liveData, historicalData} from "hooks/downloadData";
import { linearRegression } from "hooks/math";
import { createDate} from "hooks/createDate";
import { TickerData } from "./TickerData";
import { useCustomStyles } from "hooks/customStyles";
import {chartOptions,  barchartOptions, barVolumeChartOptions } from "data/chartOptions";
import css from '../styles/Chart.module.css'
import Select from 'react-select';
import { MdShowChart } from "react-icons/md";
import { useEffect, useState, useMemo } from "react";
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useData } from "hooks/dataContext";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(CategoryScale, LinearScale,BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export const Chart = () => {
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [barYaxis, setBarYAxis] = useState([]);
    const [barVolumeYAxis, setBarVolumeYAxis] = useState([])
    const [addYAxis, setAddYAxis] = useState([])
    const [downloadedHistoricalData, setDownloadedHistoricalData] = useState([]);
    const [addDownloadedHistoricalData, setAddDownloadedHistoricalData] = useState([]);
    const [downloadedLiveData, setDownloadedLiveData] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [barChartData, setBarChartData] = useState(null);
    const [barVolumeChartData, setBarVolumeChartData] = useState([])
    const [ticker] = useState('AAPL.US');
    const [tickerName]=useState('Apple INC')
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const [dataset, setDataset] = useState([]);
    const { Data, updateData } = useData();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDatepickerOpen, setIsDatepickerOpen] = useState(true);
    const [tickers, setTickers] = useState(null)

    

    const customStyles = useCustomStyles()

    const startData = useMemo(() => [
        {
          label: `${Data.ticker} - ${Data.chartName}`,
          data: yAxis,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'blue',
          fill: false,
          borderWidth: 3,
          pointRadius: 0,
        },
      ], [yAxis,Data.ticker,Data.chartName]);

    const barDataset = useMemo(() => [
        {
          label: `Min-MAx for ${Data.ticker} - ${Data.chartName}`,
          data: barYaxis,
          backgroundColor: 'rgb(10, 195, 225)',
          fill: false,
          borderWidth: 1,
          barThickness: 3,
          borderSkipped: true
        },
    ], [barYaxis, Data.ticker, Data.chartName]);
    
    const barVolumeDataset = useMemo(() => [
        {
          label: `Volume for ${Data.ticker} - ${Data.chartName}`,
          data: barVolumeYAxis,
          backgroundColor: 'rgb(153, 0, 255)',
          fill: false,
          borderWidth: 1,
          barThickness: 3,
          borderSkipped: true
        },
      ], [barVolumeYAxis,Data.ticker,Data.chartName]);
      

    const onChange = (selectedOption) => {
        const tempChartName = selectedOption.label.split('-')[1]
        updateData({
        ticker:selectedOption.value,
        tickerName: selectedOption.label,
        chartName:tempChartName ,
        isSecondChart: false,
        newChart:true
       })
    }

    const onDateChange = (dates) => {
        const [start, end] = dates;
       setStartDate(start);
       setEndDate(end);
       if (end!==null){
        setIsDatepickerOpen(true)
       }
    }
    
    useEffect(() => {
        setTickers(Data.tickers)
    },[Data.tickers])

     useEffect(()=>{
        if (isDatepickerOpen){
            if (startDate===null|| startDate===undefined){
                setStartDate(Data.startDate)
                setEndDate(Data.endDate)
            }
            else{
            const newStartDate=createDate(startDate)
            const newEndDate=createDate(endDate)
            updateData({
               startDate:newStartDate,
               endDate:newEndDate,
               newChart:true
                })
            }
            }
       
     },[startDate, endDate, updateData, isDatepickerOpen, Data.startDate, Data.endDate])

    const onInputChange = (event) => {
        setSearch(event.toLowerCase())
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
        if (Data.startDate === null && tickers !== undefined && tickers !== null) {
            let beginigEndDate = new Date();
            let beginigstartDate = new Date(beginigEndDate);
            beginigstartDate.setDate(beginigstartDate.getDate() - 30);
            const newTicker = ticker.split('.')[0];
            let country = ticker.split('.')[1];
            let results = tickers.filter(item => {
                try {
                    return item.Code.includes(newTicker); // Upewnij się, że zwracasz wynik
                } catch (error) {
                    return false; // Pomijamy element, jeśli wystąpił błąd
                }
            });
            if (country !== 'US') {
            results = results.filter(item => item.Exchange.includes(country)); 
            } else {
            results = results.filter(item => item.Country.includes('USA'))
        }
            results = results.filter(item => item.Code === (newTicker))
        updateData({
            ticker: ticker,
            tickerName:results[0].Name,
            chartName:results[0].Name,
            startDate:createDate(beginigstartDate),
            endDate: createDate(beginigEndDate),
            newChart:true
        })
    }
    }, [ticker,tickerName,updateData,Data.startDate, tickers])

    useEffect(()=>{
    if (Data.isStartPage){
        updateData(
            {
                newChart:true,
            })
    }},[Data.isStartPage, updateData])


    useEffect(() => {
        if (Data.isSecondChart === false && Data.newChart === true && Data.ticker !== null && isDatepickerOpen===true) {
            setIsDatepickerOpen(false)
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
            updateData({ newChart: false })
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
        }, [Data.endDate, Data.isSecondChart, Data.secondChart, Data.startDate, Data.ticker, updateData, Data.newChart, isDatepickerOpen]);


    useEffect(() => {
        const intervalID = setInterval(() => {
            if (!Data.isDatepickerOpen) {
                liveData(Data.ticker)
                    .then(data => {
                        if (data && !Data.isDatepickerOpen) {
                            setDownloadedLiveData(data)
                        }
                    });
            }
        }, 5000);
    
        return () => clearInterval(intervalID);
    }, [Data.ticker, Data.isDatepickerOpen]);
    
    useEffect(() => {
        if (Data.secondChartTicker !== null && Data.isSecondChart === true) {
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
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
            let tempBarLowYAxis = downloadedHistoricalData.map((axis) => axis.low);
            let tempBarHighYAxis = downloadedHistoricalData.map((axis) => axis.high);
            let tempBarVolumeYAxis = downloadedHistoricalData.map((axis) => axis.volume);
            const tempDate = new Date(downloadedLiveData.timestamp * 1000);
            let formattedDate
            tempDate ==='Invalid Date' ? formattedDate = "--"  : formattedDate = tempDate.toISOString().split('T')[0]
            if(formattedDate===Data.endDate){
                    const close = downloadedLiveData.close
                    tempXAxis.push(formattedDate)
                    tempYAxis.push(close)
                }
            const BarYAxis = []
            for (let i=0; i<tempBarLowYAxis.length; i++) {
                BarYAxis.push([tempBarLowYAxis[i], tempBarHighYAxis[i]])
            }
            setXAxis(tempXAxis);
            setYAxis(tempYAxis);
            setBarYAxis(BarYAxis)
            setBarVolumeYAxis(tempBarVolumeYAxis)
           
        }
        else if (downloadedHistoricalData.length > 0 && !downloadedLiveData.close) {
                let tempXAxis = downloadedHistoricalData.map((axis) => axis.date);
                let tempYAxis = downloadedHistoricalData.map((axis) => axis.close);
                let tempBarLowYAxis = downloadedHistoricalData.map((axis) => axis.low);
                let tempBarHighYAxis = downloadedHistoricalData.map((axis) => axis.high);
                let tempBarVolumeYAxis = downloadedHistoricalData.map((axis) => axis.volume);
                const BarYAxis= []
                for (let i=0; i<tempBarLowYAxis.length; i++) {
                    BarYAxis.push([tempBarLowYAxis[i], tempBarHighYAxis[i]])
                }
                setXAxis(tempXAxis);
                setYAxis(tempYAxis);
                setBarYAxis(BarYAxis)
                setBarVolumeYAxis(tempBarVolumeYAxis)
        
    }}, [downloadedHistoricalData, downloadedLiveData, Data.endDate]);

    useEffect(() => {
        if (addDownloadedHistoricalData.length > 0) {
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
    }, [xAxis, yAxis, ticker, dataset, Data]);

    useEffect(() => {
        if (xAxis.length > 0 && yAxis.length > 0 && ticker) {
                const tempData = {
                    labels: xAxis,
                    datasets: barDataset
                };
                setBarChartData(tempData);
        }
    }, [xAxis, yAxis, ticker, Data, barDataset]);

    useEffect(() => {
        if (xAxis.length > 0 && yAxis.length > 0 && ticker) {
                const tempData = {
                    labels: xAxis,
                    datasets: barVolumeDataset
                };
                setBarVolumeChartData(tempData);
        }
    }, [xAxis, yAxis, ticker, Data, barVolumeDataset]);

    useEffect(() => {
        if(search&&search.length>0){
            setSearchTerm(search)
        }else if (search&&search.length===0){
            setSearchTerm(search)
        }
    }, [search])

    useEffect(() => {
    if (search.length > 2 && tickers!==null) {
        const results = tickers.filter(item => {
            try{
            return (

                item.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                item.Type !== 'ETF' &&
                item.Type !== 'FUND' &&
                item.Type !== 'BOND' &&
                item.Type !== 'Mutual Fund'
                )
            }
            catch (error){
                return ('')
            }
        }
        );

        const newOptions = results.map(item => ({
            value: item.Country === 'USA' ? `${item.Code}.US` : `${item.Code}.${item.Exchange}`,
            label: `${item.Code} - ${item.Name}`
        }));

        setOptions(newOptions);
    }
}, [search, searchTerm, tickers]);


    useEffect(()=>{
        if (addYAxis&&dataset.length===1&&Data.SecondChartName!==null && Data.isSecondChart===false){
            const newDataSet= [...dataset, ...startData];
            setDataset(newDataSet)
            setAddYAxis()
            
        }
        if (addYAxis && Data.isSecondChart === true) {
            const tempDataSet=[
                {
                    label: `${Data.secondChartTicker} - ${Data.secondChartName}$`,
                    data: addYAxis,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
    },[updateData,addYAxis, yAxis, dataset, startData,  Data.isRegression, Data.SecondChartName, Data.secondChartName, Data.secondChartTicker, Data.chartTicker, Data.isSecondChart])

    useEffect(() => {
        const datePicker = document.querySelector('.react-datepicker');
        if (datePicker) {
            datePicker.style.border = 'none';
        }
        const datePickerHeader = document.querySelector('.react-datepicker__header ')
        if (datePickerHeader) {
            datePickerHeader.style.backgroundColor = '#34c1e9';
        }
    }, []);
  
    return (
        <div className={css.mainDiv}>   
            <div className={css.slectDiv}>
                <Select className={css.slect} styles={customStyles} noOptionsMessage={() => options.length < 1 ? 'Enter at least 3 characters' : 'No options available'} placeholder={Data.ticker} value={{ label: `${Data.ticker} - ${Data.chartName}`, value: Data.ticker }} name={Data.ticker} options={options} onChange={onChange} onInputChange={onInputChange} />
                <div className={css.dataDiv}>
                     <p className={parseFloat(downloadedLiveData.change_p) >0 ? `${css.green} ${css.simpleDatadiv}` : `${css.red} ${css.simpleDatadiv}`}>
                        {isNaN(parseFloat(downloadedLiveData.change_p)) 
                            ? ' -- %' 
                            : parseFloat(downloadedLiveData.change_p).toFixed(2) + '%'}
                    </p>
                </div>
            </div>
            <TickerData downloadedHistoricalData={downloadedHistoricalData} downloadedLiveData={downloadedLiveData} endDate={Data.endDate} file={'Chart'}/>
            <div className={css.datepickerDiv}>
            <DatePicker
                maxDate={new Date()}
                selected={startDate}
                onChange={onDateChange }
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
                selectsRange
                />
                {Data.isRegression!==true?
                    (<button className={css.button} id='addRegression' name='button' onClick={onClick}><MdShowChart className={`${css.icon} ${css.iconAdd}`} /></button>):
                    (<button className={css.button} id='removeRegression' name='button' onClick={onClick}><MdShowChart className={`${css.icon} ${css.iconRemove}`}/></button>)
                    }
            </div>
            {chartData && <Line className={css.chart} options={chartOptions()} data={chartData} />}
            {barChartData && <Bar className={css.chart} options={barchartOptions} data={barChartData} />}
            {barChartData && <Bar className={css.chart} options={barVolumeChartOptions} data={barVolumeChartData} />}
        </div>
    );
};
