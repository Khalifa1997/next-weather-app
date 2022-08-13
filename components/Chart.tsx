import React from "react";
import { Line } from "react-chartjs-2";
import { Box, Flex, Text } from "@chakra-ui/react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Context } from "chartjs-plugin-datalabels";

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
  ChartData,
} from "chart.js";
import WeatherIconPicker from "./WeatherIconPicker";
import { weekday } from "../commons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartDataLabels
);
type Props = {
  hourlyWeather?: [
    {
      temp: number;
      time: string;
    }
  ];
  dailyWeather?: [
    {
      temp: number;
      time: number;
      condition?: string;
    }
  ];
};
const Chart = ({ hourlyWeather, dailyWeather }: Props) => {
  const labels = hourlyWeather?.map((el) => el.time);

  const data: ChartData<"line"> = {
    labels: labels,
    datasets: [
      {
        tension: 0.5,
        label: "Weather Forecast",
        fill: true,
        backgroundColor: "#D6DAFE",
        borderColor: "#7D90FE",

        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#7D90FE",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 5,
        pointHoverRadius(ctx) {
          if (ctx.dataIndex === 0) return 0;
          return 5;
        },
        pointHoverBackgroundColor: "#7D90FE",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 3,
        pointRadius(ctx) {
          if (ctx.dataIndex === 0) return 0;
          return 1;
        },
        pointHitRadius: 10,
        data: hourlyWeather?.map((el) => el.temp)!,
      },
    ],
  };

  const lineOptions: ChartOptions<"line"> = {
    plugins: {
      datalabels: {
        display: function (context) {
          return context.dataIndex !== 0;
        },
        align: "end",
        anchor: "end",
        color: "#aeadb1",
      },
      tooltip: {
        displayColors: false,
        filter(e, index, array, data) {
          if (array[index].dataIndex === 0) return false;
          return true;
        },
        callbacks: {
          label: function (context) {
            return "Temperature: " + context.parsed.y + "°C";
          },
        },
      },
      legend: {
        labels: {
          boxWidth: 0,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          callback(tickValue, index, ticks) {
            if (index === 0) return "";
            return labels![index];
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
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
      width={{ base: 500, md: 600, lg: 600 }}
      borderRadius={6}
      marginX={{ base: 5, md: 5, lg: 0 }}
      mb={5}
      border="2px"
      borderColor="gray.400"
      bgColor="primary.f9f8fe"
    >
      <Line data={data} options={lineOptions} />
      <Flex
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        marginY={8}
        marginX={8}
      >
        {dailyWeather?.map((el, idx) => (
          <React.Fragment key={idx}>
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                marginBottom={5}
                fontSize="larger"
                textAlign="center"
                color="blackAlpha.700"
              >
                {weekday[new Date(el.time * 1000).getDay() % 7]}
              </Text>
              <WeatherIconPicker condition={el.condition} />
              <Text as="b" fontSize="large" marginTop={5} textAlign="center">
                {el.temp + " °C"}
              </Text>
            </Flex>
            {idx !== dailyWeather.length - 1 && (
              <Box
                height={[5, 8, 20]}
                borderLeft="2px"
                width={3}
                borderColor="gray.300"
              ></Box>
            )}
          </React.Fragment>
        ))}
      </Flex>
    </Box>
  );
};

export default Chart;
