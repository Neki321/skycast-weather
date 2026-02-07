interface HourlyForecastProps {
  items: any[];
}

export const HourlyForecast = ({ items }: HourlyForecastProps) => {
  return (
    <div className="mt-6">
      <p className="text-[10px] font-bold uppercase opacity-50 mb-3 ml-2 tracking-widest text-white">Найближча доба</p>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {items.slice(0, 8).map((item, idx) => (
          <div key={idx} className="flex flex-col items-center min-w-12.5 snap-center">
            <span className="text-[10px] opacity-60 text-white">
              {new Date(item.dt_txt).getHours()}:00
            </span>
            <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} className="w-8 h-8" alt="icon" />
            <span className="text-sm font-bold text-white">{Math.round(item.main.temp)}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};