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
import { Weather } from "../types";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let x = {} as Weather;
  let hourlyWeather: [{temp:number,time:string}];
  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${
        params!.city
      }&units=metric&appid=009b0829f9d39cebc103cc0e0ca5be55`
    )
    .then(async (res) => {
      await axios
        .get(
          `https://api.openuv.io/api/v1/uv?lat=${res.data.city.coord.lat.toFixed(
            2
          )}&lng=${res.data.city.coord.lon.toFixed(2)}`,
          {
            headers: {
              "x-access-token": "cb510185a58fe889ca8ee09a07c585bf",
            },
          }
        )
        .then((res) => (x = { ...x, uv: res.data.result.uv }))
        .catch((error) => (x = { ...x, uv: -1 }));
        hourlyWeather = await res.data.list.splice(1, 7).map((el) => {
          time:el.dt_txt
          temp:el.main.temp})
      x = {
        ...x,
        name: res.data.city.name,
        weather: res.data.list[0].weather[0].main,
        temp: res.data.list[0].main.temp,
        humidity: res.data.list[0].main.humidity,
        sunset: res.data.city.sunset + res.data.city.timezone,
        sunrise: res.data.city.sunrise + res.data.city.timezone,
        time: res.data.city.timezone + res.data.list[0].dt,
        hourlyWeather: res.data.list.splice(2, 8).map((el) => {
          
          return {
          time:el.dt_txt.split(" ")[1],
          temp:el.main.temp}}),
      };
      
    });
  return {
    props: {
      ...x!,
    },
  };
};
type Props = {
  uv: number;
  name: string;
  weather: Array<string>;
  temp: number;
  humidity: number;
  sunset: number;
  sunrise: number;
  time: number;
};

const Home: NextPage = ({
  humidity,
  name,
  sunrise,
  sunset,
  temp,
  uv,
  time,
  hourlyWeather,
}: Weather) => {
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
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=7f097a9f2db9466c9701377cc2733764`
      )
      .then((res) => {
        setCity(res.data.results[0].components.city);
      });
  }, [long, lat]);

  useEffect(() => {
    if (city) router.push(`/${city}`);
  }, [city]);

  return (
    <Box bgColor="primary.100" height="100vh">
      <Head>
        <title>AccuWeather - {city}</title>
      </Head>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVRVQQTQTN0mJtCCc107i_z1XfkEFE658&libraries=places"
        onLoad={() => setGoogleApiLoaded(true)}
      ></Script>
      {googleApiLoaded && <NavBar setInputCity={setCity} />}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <WeatherForecast
          time={time}
          day="Hi"
          temperature={temp}
          location={name}
        />
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
          <Chart hourlyWeather={hourlyWeather!} />
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
