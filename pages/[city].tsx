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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
        .then((res) => (x = { uv: res.data.result.uv })).catch((error) => (x = { uv: -1 }));
        x = {
          ...x,
          name: res.data.name,
          weather: res.data.weather,
          temp: res.data.main.temp,
          humidity: res.data.main.humidity,
          sunset: res.data.sys.sunset+ res.data.timezone,
          sunrise: res.data.sys.sunrise + res.data.timezone,
          time: res.data.timezone + res.data.dt
        };
        
      });
      return {
    props: {
      ...x!,
    },
  };
};
interface Props {
  uv: number;
  name: string;
  weather: Array<string>;
  temp: number;
  humidity: number;
  sunset: number;
  sunrise: number;
  time:number;
}

const Home: NextPage = ({
  humidity,
  name,
  sunrise,
  sunset,
  temp,
  uv,
  time,
  weather,
}: Props) => {
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
      .then((res) => {setCity(res.data.results[0].components.city)});
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
        <WeatherForecast time={time} day="Hi" temperature={temp} location={name} />
        <SunContainer sunrise={sunrise} sunset={sunset} humidity={humidity} UV={uv}></SunContainer>
      </Box>
    </Box>
  );
};

export default Home;
