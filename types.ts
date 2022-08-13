export interface Suggestion {
  id: string;
  displayName: string;
}

export interface Weather {
  //City Name
  name?: string;
  uv?: number;
  weather: string;
  temp: number;
  humidity?: number;
  sunset?: number;
  sunrise?: number;
  visibility?: number;
  windSpeed?: number;
  windDir?: number;
  time: string;
  condition: string;
}

export interface Forecast extends Weather {
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
}
