import { useState, useEffect } from 'react';
import { MapPin, ChevronLeft } from 'lucide-react'; // Видалили CloudRain, бо він не використовувався
import { motion, AnimatePresence } from 'framer-motion';
import { fetchWeather, fetchForecast, fetchWeatherByCoords, fetchForecastByCoords } from './services/weatherService';
import { SearchForm } from './components/SearchForm';
import { WeatherDisplay } from './components/WeatherDisplay';
import { Forecast } from './components/Forecast';
import { WeatherDetails } from './components/WeatherDetails';
import { WeatherChart } from './components/WeatherChart';
import { HourlyForecast } from './components/HourlyForecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [activeWeather, setActiveWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [fullList, setFullList] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedCity = localStorage.getItem('last_city');
    if (savedCity) handleSearch(savedCity);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      setIsLoading(true);
      try {
        const [weatherData, forecastData] = await Promise.all([
          fetchWeatherByCoords(latitude, longitude),
          fetchForecastByCoords(latitude, longitude)
        ]);
        
        setCurrentWeather(weatherData);
        setActiveWeather(weatherData);
        setFullList(forecastData);
        setForecast(forecastData.filter((_: any, i: number) => i % 8 === 0));
      } catch {
        if (!savedCity) setError('Помилка геолокації');
      } finally {
        setIsLoading(false);
      }
    });
  }, []);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError('');
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city)
      ]);
      setCurrentWeather(weatherData);
      setActiveWeather(weatherData);
      setFullList(forecastData); // ВИПРАВЛЕНО: прибрали .list
      setForecast(forecastData.filter((_: any, i: number) => i % 8 === 0)); // ВИПРАВЛЕНО: прибрали .list
      localStorage.setItem('last_city', city);
    } catch {
      setError('Місто не знайдено');
    } finally {
      setIsLoading(false);
    }
  };

  const getBackground = () => {
    const condition = activeWeather?.weather[0].main.toLowerCase() || '';
    if (condition.includes('cloud')) return 'from-slate-500 to-slate-800';
    if (condition.includes('rain')) return 'from-blue-800 to-indigo-950';
    if (condition.includes('clear')) return 'from-sky-400 to-blue-600';
    if (condition.includes('snow')) return 'from-blue-100 to-blue-300';
    return 'from-indigo-600 to-purple-800';
  };

  return (
    <div className={`min-h-screen bg-linear-to-br ${getBackground()} flex items-center justify-center p-4 transition-all duration-1000 font-sans text-white`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[3rem] p-8 shadow-2xl overflow-hidden"
      >
        <SearchForm onSearch={handleSearch} />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20 italic opacity-50">
              Аналізуємо атмосферу...
            </motion.div>
          ) : error ? ( // ТЕПЕР ВИКОРИСТОВУЄМО error ТУТ
            <motion.div key="error" className="bg-red-500/20 text-red-100 p-4 rounded-2xl text-center mb-4 border border-red-500/30 text-sm font-medium">
              {error}
            </motion.div>
          ) : activeWeather && (
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-1 opacity-50 text-[10px] font-bold uppercase tracking-widest">
                  <MapPin size={10} /> {currentWeather?.name}
                </div>
                {activeWeather.dt_txt && (
                  <button onClick={() => setActiveWeather(currentWeather)} className="text-[10px] bg-white/20 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-white/30 transition-all font-bold">
                    <ChevronLeft size={10} /> ЗАРАЗ
                  </button>
                )}
              </div>

              <WeatherDisplay data={activeWeather} />
              
              {!activeWeather.dt_txt && <WeatherChart data={fullList} />}
              {!activeWeather.dt_txt && <HourlyForecast items={fullList} />}
              
              <WeatherDetails data={activeWeather} />
              
              <Forecast 
                items={forecast} 
                onSelect={(item) => setActiveWeather(item)} 
                selectedDate={activeWeather.dt_txt} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;