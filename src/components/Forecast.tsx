import type { IForecast } from '../types/weather';

interface ForecastProps {
  items: IForecast[];
}

export const Forecast = ({ items }: ForecastProps) => {
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ua-UA', { weekday: 'short' });
  };

  return (
    <div className="mt-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex flex-col items-center min-w-21.25 transition-all hover:bg-white/20 snap-center"
        >
          <span className="text-xs font-bold uppercase opacity-60 text-white">
            {getDayName(item.dt_txt)}
          </span>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            alt="weather icon"
            className="w-12 h-12"
          />
          <span className="text-lg font-black text-white">
            {Math.round(item.main.temp)}°
          </span>
        </div>
      ))}
    </div>
  );
};