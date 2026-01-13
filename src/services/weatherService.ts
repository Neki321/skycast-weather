import axios from 'axios';
import type { IWeather } from '../types/weather';

const API_KEY = '6c9cbe67b43e936f8e0b0db61f7e62fb';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city: string): Promise<IWeather> => {
  try {
    const response = await axios.get<IWeather>(BASE_URL, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
        lang: 'ua',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
    throw error;
  }
};