import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const BarChart = ({ data }) => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (chartContainer.current && data && data.length) { // Check if the chart container and data are available
            const ctx = chartContainer.current.getContext('2d'); // Get the chart container's context
            chartInstance.current = new Chart(ctx, {   // Create a new chart instance
                type: 'bar',
                data: {
                    labels: data.map((item) => item.name), // Extract the name from each item in the data array
                    datasets: [{
                        label: 'New Total Price',
                        data: data.map((item) => item.newtotalPrice),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                    },
                    {
                        label: 'Fixed Total Price',
                        data: data.map((item) => item.fixtotalPrice),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                    }],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }

        // Cleanup function to destroy the chart instance
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return <canvas ref={chartContainer} width={600} height={200} />;
};

export default BarChart;
