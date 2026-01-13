import { useState } from 'react';
import { Search, Wind, Droplets, CloudRain } from 'lucide-react';
import { fetchWeather } from './services/weatherService';
import type { IWeather } from './types/weather';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setIsLoading(true);
    setError('');
    
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError('Місто не знайдено. Спробуйте ще раз!');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl">
        
        <form onSubmit={handleSearch} className="flex items-center bg-white/20 rounded-2xl px-4 py-2 mb-8 focus-within:ring-2 ring-white/50 transition-all">
          <input 
            type="text" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Введіть назву міста..." 
            className="bg-transparent border-none outline-none flex-1 placeholder:text-white/60 text-white py-1"
          />
          <button type="submit" className="hover:scale-110 transition-transform cursor-pointer">
            <Search size={22} className="text-white/80" />
          </button>
        </form>

        {isLoading && (
          <div className="text-center py-10 animate-pulse">
            <p className="text-xl">Завантаження...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-4 text-center">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {weather && !isLoading && !error && (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <div className="flex justify-center mb-2">
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
                alt="weather icon" 
                className="w-32 h-32 drop-shadow-lg"
              />
            </div>
            
            <h1 className="text-7xl font-black mb-2">{Math.round(weather.main.temp)}°C</h1>
            <h2 className="text-2xl font-medium tracking-wide mb-8 uppercase italic">{weather.name}</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-3xl flex flex-col items-center border border-white/5">
                <Droplets className="mb-2 text-blue-300" size={24} />
                <span className="text-xs opacity-60">Вологість</span>
                <span className="font-bold text-lg">{weather.main.humidity}%</span>
              </div>
              <div className="bg-white/10 p-4 rounded-3xl flex flex-col items-center border border-white/5">
                <CloudRain className="mb-2 text-yellow-300" size={24} />
                <span className="text-xs opacity-60">Опис</span>
                <span className="font-bold text-sm capitalize">{weather.weather[0].description}</span>
              </div>
            </div>
          </div>
        )}

        {!weather && !isLoading && !error && (
          <div className="text-center py-10 opacity-60">
            <CloudRain size={60} className="mx-auto mb-4" />
            <p className="text-lg">Дізнайтеся погоду у вашому місті</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;