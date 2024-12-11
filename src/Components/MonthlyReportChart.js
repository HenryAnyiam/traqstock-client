import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { fetchFarmData } from '../Utils/Funcs';

ChartJS.defaults.font.size = 10;




function MonthlyReportChart() {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    fetchFarmData()
      .then((res) => {
        console.log(res.status);
        res.json()
          .then((data) => {
            console.log(data);
            setFeedData(data);
          })
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const data = {
    labels: feedData.map((data) => new Date(data.date_recorded).toLocaleDateString()),
    datasets: [
      {
        label: 'Feed Intake',
        data: feedData.map((data) => data.feed_intake),
        fill: true,
        tension: 0.3,
        borderColor: ['rgba(219, 199, 111, 0.6)'],
        backgroundColor: ['rgba(219, 199, 111, 0.2)'],
        pointBackgroundColor: ['rgba(219, 199, 111)'],
        pointBorderColor: ['rgba(219, 199, 111)'],
      },
      {
        label: 'Water Intake',
        data: feedData.map((data) => data.water_intake),
        fill: true,
        tension: 0.3,
        borderColor: ['rgba(54, 162, 235, 0.6)'],
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        pointBackgroundColor: ['rgba(54, 162, 235)'],
        pointBorderColor: ['rgba(54, 162, 235)'],
      },
    ]
  }

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Farm Data',
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

export default MonthlyReportChart;
