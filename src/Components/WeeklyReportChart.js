import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

ChartJS.defaults.font.size = 10;

const feedData = [
  { startOfWeek: '2024-07-27', bagsConsumed: 85, litresConsumed: 17, mortality: 4 },
  { startOfWeek: '2024-08-04', bagsConsumed: 65, litresConsumed: 12, mortality: 3 },
  { startOfWeek: '2024-08-11', bagsConsumed: 100, litresConsumed: 10, mortality: 0 },
  { startOfWeek: '2024-08-18', bagsConsumed: 105, litresConsumed: 15, mortality: 1 },
  { startOfWeek: '2024-08-25', bagsConsumed: 103, litresConsumed: 12, mortality: 5 },
  { startOfWeek: '2024-09-01', bagsConsumed: 100, litresConsumed: 13, mortality: 1 },
  { startOfWeek: '2024-09-08', bagsConsumed: 90, litresConsumed: 17, mortality: 3 },
  { startOfWeek: '2024-09-15', bagsConsumed: 120, litresConsumed: 15, mortality: 4 },
  { startOfWeek: '2024-09-22', bagsConsumed: 110, litresConsumed: 11, mortality: 2 },
  { startOfWeek: '2024-09-29', bagsConsumed: 130, litresConsumed: 14, mortality: 0 },
];

function WeeklyReportChart() {
  const data = {
    labels: feedData.map((data) => new Date(data.startOfWeek).toLocaleDateString()),
    datasets: [
      {
        label: 'Weekly Feed Intake',
        data: feedData.map((data) => data.bagsConsumed),
        fill: true,
        tension: 0.3,
        borderColor: ['rgba(219, 199, 111, 0.6)'],
        backgroundColor: ['rgba(219, 199, 111, 0.2)'],
        pointBackgroundColor: ['rgba(219, 199, 111)'],
        pointBorderColor: ['rgba(219, 199, 111)'],
      },
      {
        label: 'Weekly Water Intake',
        data: feedData.map((data) => data.litresConsumed),
        fill: true,
        tension: 0.3,
        borderColor: ['rgba(54, 162, 235, 0.6)'],
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        pointBackgroundColor: ['rgba(54, 162, 235)'],
        pointBorderColor: ['rgba(54, 162, 235)'],
      },
      {
        label: 'Weekly Mortality Rate',
        data: feedData.map((data) => data.mortality),
        fill: true,
        tension: 0.3,
        borderColor: ['rgba(255, 0, 0, 0.6)'],
        backgroundColor: ['rgba(255, 0, 0, 0.2)'],
        pointBackgroundColor: ['rgba(255, 0, 0)'],
        pointBorderColor: ['rgba(255, 0, 0)'],
      },
    ]
  }

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Week Starting',
          font: {
            size: 14,
            family: 'Righteous, Montserrat, system-ui'
          }
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Righteous, Montserrat, system-ui'
          }
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
  }
  return (
    <div className='p-2'>
      <Line data={data} options={options}/>
    </div>
  )
}

export default WeeklyReportChart