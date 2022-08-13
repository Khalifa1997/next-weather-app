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
import { getSession, useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import WindContainer from "../components/WindContainer";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let x = {} as Forecast;
  const { params } = context;
  let error = false;
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
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
        .then((res) => {
          x = { ...x, uv: res.data.result.uv };
        })
        .catch(() => (x = { ...x, uv: -1 }));
      const now = new Date();
      const offset = now.getTimezoneOffset();
      x = {
        ...x,
        name: res.data.city.name,
        weather: res.data.list[0].weather[0].main,
        temp: res.data.list[0].main.temp,
        humidity: res.data.list[0].main.humidity,
        sunset: res.data.city.sunset,
        sunrise: res.data.city.sunrise,
        visibility: res.data.list[0].visibility,
        windDir: res.data.list[0].wind.deg,
        windSpeed: res.data.list[0].wind.speed,
        time: JSON.stringify(
          new Date(
            now.getTime() + offset * 60 * 1000 + res.data.city.timezone * 1000
          )
        ), //res.data.list[0].dt + res.data.city.timezone,
        condition: res.data.list[0].weather[0].main,
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
    })
    .catch(async () => {
      error = true;
    });
  if (error)
    return {
      notFound: true,
    };
  else
    return {
      props: {
        session: await unstable_getServerSession(
          context.req,
          context.res,
          authOptions
        ),
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
  windDir,
  windSpeed,
  condition,
}: Forecast) => {
  const router = useRouter();
  const { data } = useSession();
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
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=` +
          process.env.NEXT_PUBLIC_OPEN_CAGE_API
      )
      .then((res) => {
        if (res.data.results[0].components.city)
          setCity(res.data.results[0].components.city);
      });
  }, [long, lat]);

  useEffect(() => {
    if (city) router.push(`/${city}`);
  }, [city]);
  return (
    <Box bgColor="primary.100" minHeight="100%">
      <Head>
        <title>AccuWeather - {city}</title>
      </Head>
      <Script
        src={
          "https://maps.googleapis.com/maps/api/js?key=" +
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API +
          "&libraries=places"
        }
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
          temperature={temp}
          location={name}
          condition={condition}
        />

        <Flex
          direction={{ base: "column", md: "column", lg: "row" }}
          justifyContent={{
            base: "center",
            md: "space-around",
            lg: "space-around",
          }}
          alignItems="center"
          gap={{ base: 10, md: 10, lg: 40 }}
          marginTop={4}
        >
          <Flex direction="column">
            <SunContainer
              sunrise={sunrise!}
              sunset={sunset!}
              humidity={humidity!}
              UV={uv!}
            ></SunContainer>
            <WindContainer windDir={windDir!} windSpeed={windSpeed!} />
          </Flex>
          <Chart hourlyWeather={hourlyWeather!} dailyWeather={dailyWeather!} />
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
