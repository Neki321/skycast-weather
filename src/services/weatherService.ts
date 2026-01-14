import axios from 'axios';
import type { IWeather, IForecast, ICitySuggestion } from '../types/weather';

const API_KEY = '6c9cbe67b43e936f8e0b0db61f7e62fb';
const BASE_URL = 'https://api.openweathermap.org';

export const fetchWeather = async (city: string): Promise<IWeather> => {
  const response = await axios.get<IWeather>(`${BASE_URL}/data/2.5/weather`, {
    params: { q: city, units: 'metric', appid: API_KEY, lang: 'ua' },
  });
  return response.data;
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<IWeather> => {
  const response = await axios.get<IWeather>(`${BASE_URL}/data/2.5/weather`, {
    params: { lat, lon, units: 'metric', appid: API_KEY, lang: 'ua' },
  });
  return response.data;
};

export const fetchForecast = async (city: string): Promise<IForecast[]> => {
  const response = await axios.get(`${BASE_URL}/data/2.5/forecast`, {
    params: { q: city, units: 'metric', appid: API_KEY, lang: 'ua' },
  });
  return response.data.list.filter((_: any, index: number) => index % 8 === 0);
};

export const fetchForecastByCoords = async (lat: number, lon: number): Promise<IForecast[]> => {
  const response = await axios.get(`${BASE_URL}/data/2.5/forecast`, {
    params: { lat, lon, units: 'metric', appid: API_KEY, lang: 'ua' },
  });
  return response.data.list.filter((_: any, index: number) => index % 8 === 0);
};

export const fetchCitySuggestions = async (query: string): Promise<ICitySuggestion[]> => {
  if (query.length < 3) return [];
  const response = await axios.get<ICitySuggestion[]>(`${BASE_URL}/geo/1.0/direct`, {
    params: { q: query, limit: 5, appid: API_KEY },
  });
  return response.data;
};