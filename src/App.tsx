import { useState, useEffect } from 'react';
import { CloudRain, MapPin } from 'lucide-react';
import { fetchWeather, fetchForecast, fetchWeatherByCoords, fetchForecastByCoords } from './services/weatherService';
import { SearchForm } from './components/SearchForm';
import { WeatherDisplay } from './components/WeatherDisplay';
import { Forecast } from './components/Forecast';
import type { IWeather, IForecast } from './types/weather';

function App() {
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [forecast, setForecast] = useState<IForecast[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedCity = localStorage.getItem('last_city');

    if (savedCity) {
      handleSearch(savedCity);
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setIsLoading(true);
        try {
          const [weatherData, forecastData] = await Promise.all([
            fetchWeatherByCoords(latitude, longitude),
            fetchForecastByCoords(latitude, longitude)
          ]);
          setWeather(weatherData);
          setForecast(forecastData);
          localStorage.setItem('last_city', weatherData.name);
        } catch {
          if (!savedCity) setError('Не вдалося отримати локальну погоду');
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        if (!savedCity) {
          console.log('Геолокацію відхилено, використовуємо збережене місто або чекаємо на ввід');
        }
      }
    );
  }, []);

  const getBackground = () => {
    if (!weather) return 'from-blue-500 to-purple-600';
    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes('cloud')) return 'from-slate-500 to-slate-700';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'from-indigo-800 to-blue-900';
    if (condition.includes('clear')) return 'from-orange-400 to-yellow-500';
    if (condition.includes('snow')) return 'from-blue-100 to-blue-300';
    return 'from-blue-500 to-purple-600';
  };

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError('');
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      localStorage.setItem('last_city', city);
    } catch {
      setError('Місто не знайдено!');
      setWeather(null);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-linear-to-br ${getBackground()} flex items-center justify-center p-4 transition-all duration-1000`}>
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl">
        <SearchForm onSearch={handleSearch} />

        {isLoading && (
          <div className="text-center py-10 animate-pulse">
            <p className="text-xl font-medium text-white italic">Оновлюємо дані...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-4 text-center">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {weather && !isLoading && !error && (
          <div className="animate-in fade-in duration-700">
            <div className="flex items-center justify-center gap-1 mb-2 opacity-70 text-white">
              <MapPin size={14} />
              <span className="text-xs font-light">{weather.name}</span>
            </div>
            <WeatherDisplay data={weather} />
            {forecast.length > 0 && <Forecast items={forecast} />}
          </div>
        )}

        {!weather && !isLoading && !error && (
          <div className="text-center py-10 opacity-60 text-white">
            <CloudRain size={60} className="mx-auto mb-4" />
            <p className="text-lg font-light">Введіть місто для прогнозу</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;