import { Droplets, CloudRain } from 'lucide-react';
import type { IWeather } from '../types/weather';

interface WeatherDisplayProps {
  data: IWeather;
}

export const WeatherDisplay = ({ data }: WeatherDisplayProps) => {
  return (
    <div className="text-center animate-in fade-in zoom-in duration-700">
      <div className="flex justify-center mb-2">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt="weather icon"
          className="w-32 h-32 drop-shadow-lg"
        />
      </div>
      
      <h1 className="text-7xl font-black mb-2 text-white">{Math.round(data.main.temp)}°C</h1>
      <h2 className="text-2xl font-medium tracking-wide mb-8 uppercase italic text-white/90">{data.name}</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 p-4 rounded-3xl flex flex-col items-center border border-white/5">
          <Droplets className="mb-2 text-blue-300" size={24} />
          <span className="text-xs opacity-60 text-white uppercase tracking-tighter">Вологість</span>
          <span className="font-bold text-lg text-white">{data.main.humidity}%</span>
        </div>
        <div className="bg-white/10 p-4 rounded-3xl flex flex-col items-center border border-white/5">
          <CloudRain className="mb-2 text-yellow-300" size={24} />
          <span className="text-xs opacity-60 text-white uppercase tracking-tighter">Опис</span>
          <span className="font-bold text-sm capitalize text-white text-center leading-tight">
            {data.weather[0].description}
          </span>
        </div>
      </div>
    </div>
  );
};