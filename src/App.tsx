import { useState } from 'react';
import { CloudRain } from 'lucide-react';
import { fetchWeather } from './services/weatherService';
import { SearchForm } from './components/SearchForm';
import { WeatherDisplay } from './components/WeatherDisplay';
import type { IWeather } from './types/weather';

function App() {
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError('Місто не знайдено!');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4 font-sans text-white leading-relaxed">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl">
        
        <SearchForm onSearch={handleSearch} />

        {isLoading && (
          <div className="text-center py-10 animate-pulse">
            <p className="text-xl font-medium">Шукаємо хмаринки...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-4 text-center">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {weather && !isLoading && !error && (
          <WeatherDisplay data={weather} />
        )}

        {!weather && !isLoading && !error && (
          <div className="text-center py-10 opacity-60">
            <CloudRain size={60} className="mx-auto mb-4" />
            <p className="text-lg">Введіть назву міста</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;