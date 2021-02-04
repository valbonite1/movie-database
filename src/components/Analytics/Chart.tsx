import React from 'react'
import { HorizontalBar } from 'react-chartjs-2';
import './Chart.css';
import axios from 'axios';

const Chart: React.FC = () => {

  const [chart, setChart] = React.useState({});

  const getAnalytics = async () => {

    let movieYear: number[] = []
    let movieCount: number [] = []

    await axios
    .get(`${process.env.REACT_APP_BASE_URL}/analytics/year`)
    .then(result => {
      const { data: results } = result.data;
      for (let year of results) {
        movieYear.push(year._id);
        movieCount.push(year.count)
      }
      setChart({
        labels: movieYear.reverse(),
        datasets: [
          {
            label: "Movie Count",
            data: movieCount.reverse(),
            borderWidth: 0,
            backgroundColor: `#EEB600`,
            pointHoverBorderColor: '#810f7c',
            pointBorderColor: `#EEB600`,
            pointBackgroundColor: `#EEB600`,

          }
        ]
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  React.useEffect(() => {
    getAnalytics();
    
  }, [])


  return (
    <>
      <div className='chart-container'>
        <div className='mobile-chart'>
          <HorizontalBar 
            type={{
              type: "horizontalBar"
            }}
            data={chart}
            height={800}
            width={600}
            options={{
              responsive: true,
              title: { text: "MOVIES RELEASED PER YEAR", display: true, fontColor: "white" },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      fontColor: "white",
                      beginAtZero: true,
                      maxTicksLimit: 20
                    },
                    gridLines: {
                      display: false
                    }
                  }
                ],
                xAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 8,
                      beginAtZero: true,
                      fontColor: "white"
                    },
                    gridLines: {
                      display: true,
                      color: "#333"
                    },
                  }
                ],
              }
            }}
          />
        </div>
        <div className='desktop-chart'>
          <HorizontalBar 
            type={{
              type: "horizontalBar"
            }}
            data={chart}
            height={300}
            width={600}
            options={{
              responsive: true,
              title: { text: "MOVIES RELEASED PER YEAR", display: true, fontColor: "white" },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      fontColor: "white",
                      beginAtZero: true,
                      maxTicksLimit: 25
                    },
                    gridLines: {
                      display: false
                    }
                  }
                ],
                xAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 8,
                      beginAtZero: true,
                      fontColor: "white"
                    },
                    gridLines: {
                      display: true,
                      color: "#333"
                    },
                  }
                ],
              }
            }}
          />
        </div>
          
      </div>
    </>
  )
}

export default Chart;
