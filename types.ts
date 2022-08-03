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
  time: number;
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
      time: string;
      condition?: string;
    }
  ];
}
