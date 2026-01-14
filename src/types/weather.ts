export interface IWeather {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

export interface IForecast {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
  dt_txt: string;
}

export interface ICitySuggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}