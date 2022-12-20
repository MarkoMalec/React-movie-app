import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import pako from 'pako';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PopularityChart = ({ popularity }) => {
  const [theDate, setTheDate] = useState();
  const [chartOptions, setChartOptions] = useState({});
  const [chartData, setChartData] = useState({});
  const [files, setFiles] = useState({});

  const exec = async () => {
    // const first = getDateXDaysAgo(0);
    // const second = getDateXDaysAgo(1);
    // const third = getDateXDaysAgo(2);
    // const fourth = getDateXDaysAgo(3);
    // const fifth = getDateXDaysAgo(4);
    // console.log(first);
    // console.log(second);


    function getDateXDaysAgo() {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() - 1;
      const year = date.getFullYear();
      const today = `${year}-${month}-${day}`;
      setTheDate(today);
    }

    try {
      const res = await fetch(
        `http://files.tmdb.org/p/exports/movie_ids_10_10_2022.json.gz`
      );
      const buf = await res.arrayBuffer();
      const outBuf = pako.inflate(buf);

      const str = new TextDecoder().decode(outBuf);
      const jsonString = str.split('\n').join(',').slice(0, -1);
      const test = `[${jsonString}]`;
      // console.log('returning', JSON.parse(test));
      const results = JSON.parse(test);
      // console.log(results, 'file export');

    // setChartOptions(options);
    // setChartData(data);
    console.log(results);
    // return results;
  } catch (err) {
      console.error('unable to decompress', err);
    }
  };
  
  const { data, error, isLoading } = useQuery('popularity', exec);
  console.log(data, 'this is the data');
  
  // if (error) return <p>error</p>;
  // if (isLoading) return <p>loading...</p>;
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //       position: 'right',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Popularity',
  //     },
  //   },
  // };
  
  // const labels = [
  //   'June', 'July', 'August', 'September', 'November', 'Today',
  // ];
  
  // const data = {
  //   labels: ['Nov', 'Dec'],
  //   datasets: [
  //     {
  //       label: 'Today',
  //       data: [3400, popularity],
  //       borderColor: 'tomato',
  //       backgroundColor: ['rgba(255, 99, 71, .2)'],
  //       // width: '10px',
  //       borderWidth: 1,
  //     },
  //   ],
  // }

  return (
    <>
      {/* <Doughnut data={data} /> */}
    </>
  );
};

export default PopularityChart;
