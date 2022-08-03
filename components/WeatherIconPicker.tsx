import React, { ReactNode } from "react";
import {
  BsBrightnessHigh,
  BsCloudFog2,
  BsCloudHaze,
  BsCloudLightningRain,
  BsCloudRainHeavy,
  BsClouds,
  BsCloudSnow,
  BsTornado,
} from "react-icons/bs";

type Props = {
  condition?: string;
};
const WeatherIconPicker = ({ condition }: Props) => {
  let weather: ReactNode;
  switch (condition) {
    case "Thunderstorm":
      weather = <BsCloudLightningRain size={40} color="#6B81FE" />;
      break;
    case "Rain":
      weather = <BsCloudRainHeavy size={40} color="#6B81FE" />;
      break;
    case "Snow":
      weather = <BsCloudSnow size={40} color="#6B81FE" />;
      break;
    case "Clear":
      weather = <BsBrightnessHigh size={40} color="#6B81FE" />;
      break;
    case "Clouds":
      weather = <BsClouds size={40} color="#6B81FE" />;
      break;
    case "Fog":
      weather = <BsCloudFog2 size={40} color="#6B81FE" />;
      break;
    case "Tornado":
      weather = <BsTornado size={40} color="#6B81FE" />;
      break;
    case "Haze":
      weather = <BsCloudHaze size={40} color="#6B81FE" />;
      break;
    default:
      weather = <BsBrightnessHigh size={40} color="#6B81FE" />;
      break;
  }
  return weather;
};

export default WeatherIconPicker;
