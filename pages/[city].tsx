import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import SunContainer from "../components/SunContainer";
import WeatherForecast from "../components/WeatherForecast";
import Script from "next/script";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({params}) =>  {
  let x: {};
  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=009b0829f9d39cebc103cc0e0ca5be55&units=metric`
    )
    .then(async (res) => {
      await axios
        .get(
          `https://api.openuv.io/api/v1/uv?lat=${res.data.coord.lat.toFixed(
            2
          )}&lng=${res.data.coord.lon.toFixed(2)}`,
          {
            headers: {
              "x-access-token": "cb510185a58fe889ca8ee09a07c585bf",
            },
          }
        )
        .then((res) => (x = { uv: res.data.result.uv }));
      x = {
        ...x,
        name: res.data.name,
        weather: res.data.weather,
        temp: res.data.main.temp,
        humidity: res.data.main.humidity,
        sunset: res.data.sys.sunset,
        sunrise: res.data.sys.sunrise,
      };
    });
  return {
    props: {
      ...x!,
    },
  };
}
interface Props {
  uv: number;
  name: string;
  weather: Array<string>;
  temp: number;
  humidity: number;
  sunset: number;
  sunrise: number;
}

const Home: NextPage = ({
  humidity,
  name,
  sunrise,
  sunset,
  temp,
  uv,
  weather,
}: Props) => {
  const router = useRouter()

  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);
  const [city, setCity] = useState(null);
  useEffect(() => {
    if(city)
   router.push(`/${city}`)
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
        <WeatherForecast day="Hi" temperature={temp} location={name} />
        <SunContainer humidity={humidity} UV={uv}></SunContainer>
      </Box>
    </Box>
  );
};

export default Home;
