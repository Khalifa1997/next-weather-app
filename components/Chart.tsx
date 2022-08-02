import React from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
type Props = {
  hourlyWeather?: [
    {
      temp: number;
      time: string;
    }
  ];
};
const Chart = ({ hourlyWeather }: Props) => {
  const data = {
    labels: hourlyWeather?.map((el) => el.time),
    datasets: [
      {
        label: "Weather Forecast",
        fill: true,

        lineTension: 0.1,
        backgroundColor: "#D6DAFE",
        borderColor: "#7D90FE",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#7D90FE",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#7D90FE",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: hourlyWeather?.map((el) => el.temp),
      },
    ],
  };

  const lineOptions: ChartOptions = {
    plugins: {
      legend: {
        labels: {
          boxWidth: 0,
        },
      },
    },
    scales: {
      y: {
        min:
          Math.round(Math.min(...hourlyWeather!.map((o) => o.temp)) / 5) * 5 -
          5,
        max: Math.round(Math.max(...hourlyWeather!.map((o) => o.temp)) + 5),

        ticks: {
          // forces step size to be 50 units

          stepSize: 5,
        },
      },
    },
  };

  return (
    <Box
      fontFamily="sans-serif"
      textAlign="center"
      bg="white"
      width="800px"
      borderRadius={6}
      border="2px"
      borderColor="gray.400"
      bgColor="primary.f9f8fe"
    >
      <Line data={data} options={lineOptions} />
    </Box>
  );
};

export default Chart;
