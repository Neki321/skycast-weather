import type { IForecast } from '../types/weather';

interface ForecastProps {
  items: IForecast[];
  onSelect: (item: IForecast) => void;
  selectedDate?: string;
}

export const Forecast = ({ items, onSelect, selectedDate }: ForecastProps) => {
  const getDayName = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ua-UA', { weekday: 'short' });
  };

  return (
    <div className="mt-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect(item)}
          className={`backdrop-blur-md border rounded-2xl p-3 flex flex-col items-center min-w-21.25 transition-all snap-center outline-none ${
            selectedDate === item.dt_txt 
            ? 'bg-white/30 border-white/40 scale-105 shadow-xl' 
            : 'bg-white/10 border-white/10 hover:bg-white/20'
          }`}
        >
          <span className="text-[10px] font-bold uppercase opacity-60 text-white">
            {getDayName(item.dt_txt)}
          </span>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            alt="icon"
            className="w-10 h-10"
          />
          <span className="text-lg font-black text-white">
            {Math.round(item.main.temp)}°
          </span>
        </button>
      ))}
    </div>
  );
};