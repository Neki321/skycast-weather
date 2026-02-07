import { Thermometer, Eye, Gauge, Wind, Sunrise, Sunset } from 'lucide-react';

interface WeatherDetailsProps {
  data: any;
}

export const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const formatTime = (timestamp: number) => {
    if (!timestamp) return '--:--';
    return new Date(timestamp * 1000).toLocaleTimeString('ua-UA', { hour: '2-digit', minute: '2-digit' });
  };

  const items = [
    { label: 'Відчувається', value: `${Math.round(data.main.feels_like)}°`, icon: Thermometer, color: 'text-orange-400' },
    { label: 'Вітер', value: `${data.wind.speed} м/с`, icon: Wind, color: 'text-blue-400' },
    { label: 'Тиск', value: `${data.main.pressure} hPa`, icon: Gauge, color: 'text-emerald-400' },
    { label: 'Видимість', value: `${(data.visibility / 1000).toFixed(1)} км`, icon: Eye, color: 'text-purple-400' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-3">
          <item.icon size={18} className={item.color} />
          <div>
            <p className="text-[10px] uppercase opacity-50 font-bold tracking-tighter text-white">{item.label}</p>
            <p className="text-sm font-semibold text-white">{item.value}</p>
          </div>
        </div>
      ))}
      {data.sys?.sunrise && (
        <div className="col-span-2 bg-white/5 border border-white/10 rounded-2xl p-3 flex justify-around items-center">
          <div className="flex items-center gap-2">
            <Sunrise size={18} className="text-yellow-400" />
            <span className="text-sm text-white font-medium">{formatTime(data.sys.sunrise)}</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <Sunset size={18} className="text-orange-500" />
            <span className="text-sm text-white font-medium">{formatTime(data.sys.sunset)}</span>
          </div>
        </div>
      )}
    </div>
  );
};