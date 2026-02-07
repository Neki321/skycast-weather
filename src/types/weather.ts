export interface IWeather {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: { speed: number };
  sys: { sunrise: number; sunset: number };
  visibility: number;
  dt_txt?: string;
}

export interface IForecast {
  dt: number;
  main: { 
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: { icon: string; description: string; main: string }[];
  wind: { speed: number };
  visibility: number;
  dt_txt: string;
}

export interface ICitySuggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}