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
  hourlyWeather?: [
    {
      temp: number;
      time: string;
    }
  ];
}
