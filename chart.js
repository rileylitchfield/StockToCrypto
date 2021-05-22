function graphData(argsObj) {

    Chart.defaults.font.size = 16;
    const labels = argsObj.cryptoGraphTimeline;
    const labelObj = { "BTC/USD": "Bitcoin", "ETH/USD": "Ethereum", "XRP/USD": "Ripple", "GSPC": "S&P 500", "DJI": "Dow Jones", "IXIC": "NASDAQ", }

    const data = {
        labels: labels,
        datasets: [
            {
                label: labelObj[changeCryptoValue],
                data: argsObj.cryptoGraphPrice,
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                yAxisID: 'y',
            },
            {
                label: labelObj[changeStockValue],
                data: argsObj.stockGraphPrice,
                borderColor: 'rgb(0, 0, 255)',
                backgroundColor: 'rgba(0, 0, 255, 0.5)',
                yAxisID: 'y1',
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            stacked: false,
            plugins: {
                title: {
                    display: false,
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: 'red',
                        beginAtZero: true,
                        // Include a dollar sign & commas
                        callback: function (value) {
                            return '$' + value.toLocaleString();
                        }
                    },
                    title: {
                        display: true,
                        text: labelObj[changeCryptoValue] + ' (USD)',
                        color: 'red',
                        font: {
                            size: 16
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: 'blue',
                    },
                    // grid line settings
                    grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                    title: {
                        display: true,
                        text: labelObj[changeStockValue],
                        color: 'blue',
                        font: {
                            size: 16
                        }
                    }
                },
            }
        },
    };

    window.myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

}

function clearChart() {
    myChart.destroy();
}