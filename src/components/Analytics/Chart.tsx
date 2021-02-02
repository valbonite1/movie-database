import React from 'react'
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const Chart: React.FC = () => {

  const [chart, setChart] = React.useState({});

  const getAnalytics = async () => {

    let xlabels: number[] = []
    let ylabels: number [] = []

    await axios
    .get(`${process.env.REACT_APP_BASE_URL}/analytics/year`)
    .then(result => {
      const { data: results } = result.data;
      for (let year of results) {
        xlabels.push(year._id);
        ylabels.push(year.count)
      }
      setChart({
        labels: xlabels,
        datasets: [
          {
            label: "Movie Count",
            data: ylabels,
            borderWidth: 0,
            backgroundColor: `#EEB600`,
            pointHoverBorderColor: '#810f7c',
            pointBorderColor: `#EEB600`,
            pointBackgroundColor: `#EEB600`,

          }
        ]
      });
      console.log(xlabels);
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
      <Bar 
        data={chart}
        height={200}
        width={600}
        options={{
          responsive: true,
          title: { text: "MOVIES RELEASED PER YEAR", display: true, fontColor: "white" },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                  fontColor: "white"
                },
                gridLines: {
                  display: true,
                  color: "#333"
                },
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "white"
                },
                gridLines: {
                  display: false
                }
              }
            ]
          }
        }}
      />
    </>
  )
}

export default Chart;
