import { liveData, historicalData } from "hooks/downloadData";
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Chart = () => {
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [downloadedHistoricalData, setDownloadedHistoricalData] = useState([]);
    const [downloadedLiveData, setDownloadedLiveData] = useState([]);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        liveData('AAPL.US')
            .then(data => {
                if (data) {
                    setDownloadedLiveData(data);
                }
            });

        historicalData('AAPL.US', '2020-01-05', '2024-08-01')
            .then(data => {
                if (data) {
                    setDownloadedHistoricalData(data);
                }
            });
    }, []);

    useEffect(() => {
        console.log(downloadedHistoricalData)
        console.log(downloadedLiveData)
        if (downloadedHistoricalData && downloadedLiveData ) {
            const tempXAxis = downloadedHistoricalData.map((axis) => axis.date);
            const tempYAxis = downloadedHistoricalData.map((axis) => axis.close);
            setXAxis(tempXAxis);
            setYAxis(tempYAxis);
            console.log('done')
        }
    }, [downloadedHistoricalData, downloadedLiveData]);

    useEffect(() => {
        console.log(xAxis)
        if (xAxis.length > 0 && yAxis.length > 0) {
            const tempData = {
                labels: xAxis,
                datasets: [
                    {
                        label: 'AAPL.US',
                        data: yAxis,
                        borderColor: 'blue',
                        fill: false,
                    },
                ],
            };
            setChartData(tempData);
        }
    }, [xAxis, yAxis]);

    const options = {};

    return (
        <div>
            {chartData && <Line options={options} data={chartData} />}
        </div>
    );
};
