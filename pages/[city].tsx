import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import SunContainer from "../components/SunContainer";
import WeatherForecast from "../components/WeatherForecast";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Chart from "../components/Chart";
import { Forecast } from "../types";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let x = {} as Forecast;
  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${
        params!.city
      }&units=metric&appid=${process.env.OPEN_WEATHER_API}`
    )
    .then(async (res) => {
      await axios
        .get(
          `https://api.openuv.io/api/v1/uv?lat=${res.data.city.coord.lat.toFixed(
            2
          )}&lng=${res.data.city.coord.lon.toFixed(2)}`,
          {
            headers: {
              "x-access-token": `${process.env.OPEN_UV_API}`,
            },
          }
        )
        .then((res) => (x = { ...x, uv: res.data.result.uv }))
        .catch(() => (x = { ...x, uv: -1 }));
      x = {
        ...x,
        name: res.data.city.name,
        weather: res.data.list[0].weather[0].main,
        temp: res.data.list[0].main.temp,
        humidity: res.data.list[0].main.humidity,
        sunset: res.data.city.sunset + res.data.city.timezone,
        sunrise: res.data.city.sunrise + res.data.city.timezone,
        time: res.data.list[0].dt,
        hourlyWeather: res.data.list.slice(1, 8).map((el: any) => {
          return {
            time: el.dt_txt.split(" ")[1].slice(0, -3),
            temp: el.main.temp.toFixed(1),
          };
        }),
        dailyWeather: res.data.list
          .filter((el: any) => el.dt_txt.includes("12:00:00"))
          .map((el: any) => {
            return {
              time: el.dt,
              //time: el.dt_txt.split(" ")[0],
              temp: el.main.temp.toFixed(0),
              condition: el.weather[0].main,
            };
          }),
      };
    });
  return {
    props: {
      ...x!,
    },
  };
};

const Home: NextPage<Forecast> = ({
  humidity,
  name,
  sunrise,
  sunset,
  temp,
  uv,
  time,
  hourlyWeather,
  dailyWeather,
}: Forecast) => {
  const router = useRouter();

  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);
  const [city, setCity] = useState(name);
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  function success(pos: GeolocationPosition) {
    const crd = pos.coords;
    setLong(crd.longitude.toString());
    setLat(crd.latitude.toString());
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);

    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${process.env.OPEN_CAGE_API}`
      )
      .then((res) => {
        setCity(res.data.results[0].components.city);
      });
  }, [long, lat]);

  useEffect(() => {
    if (city) router.push(`/${city}`);
  }, [city]);
  const googleMapsAPI = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API}&libraries=places`;
  return (
    <Box bgColor="primary.100" height="100vh">
      <Head>
        <title>AccuWeather - {city}</title>
      </Head>
      <Script
        src={googleMapsAPI}
        onLoad={() => setGoogleApiLoaded(true)}
      ></Script>
      {googleApiLoaded && <NavBar setInputCity={setCity} />}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <WeatherForecast time={time} temperature={temp} location={name} />

        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={40}
          marginTop={4}
        >
          <SunContainer
            sunrise={sunrise!}
            sunset={sunset!}
            humidity={humidity!}
            UV={uv!}
          ></SunContainer>
          <Chart hourlyWeather={hourlyWeather!} dailyWeather={dailyWeather!} />
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
