var ctx1 = document.getElementById('lineChart1').getContext('2d');

// Function to update the Chart.js configuration with the fetched data for Line Chart
function updateLineChart(data) {
    // console.log('API Data:', data);

    // Check if data is defined and has the expected structure
    if (!data || !Array.isArray(data) || data.length === 0 || !data[0].year || !data[0].stage) {
        console.error('Invalid data format for Line Chart:', data);
        return;
    }

    // Extract the relevant information from the provided structure
    var chartData = {
        labels: data.map(entry => entry.year.year),  // Map years to labels
        datasets: [{
            label: 'NUP Stage',
            data: data.map((entry, index) => ({
                x: entry.year.year,
                y: entry.stage
            })),
            borderColor: '#82325f',
            borderWidth: 1,
            fill: false
        }]
    };

    var chartOptions = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Years'
                },
                ticks: {
                    callback: function(value, index, values) {
                        return Math.round(value); // Convert to whole number
                    }
                }
            },
            y: {
                type: 'category',
                labels: data.map(entry => entry.stage).filter((value, index, self) => self.indexOf(value) === index),  // Unique labels
                title: {
                    display: true,
                    text: 'Stages'
                }
            }
        }
    };

    // Assuming you have already created the chart instance
    var lineChart = new Chart(ctx1, {
        type: 'line',
        data: chartData,
        options: chartOptions
    });
}

// Example data to test the chart
var exampleData = [
    { stage: 'Planning', year: { year: 2020 } },
    { stage: 'Building', year: { year: 2021 } },
    { stage: 'Testing', year: { year: 2022 } },
    { stage: 'Deploying', year: { year: 2023 } },
    { stage: 'Deploying 1', year: { year: 2024 } },
    { stage: 'Maintenance', year: { year: 2025 } },
    { stage: 'Maintenance', year: { year: 2026 } }
];

updateLineChart(exampleData);
