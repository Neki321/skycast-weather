import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface WeatherChartProps {
  data: any[];
}

export const WeatherChart = ({ data }: WeatherChartProps) => {
    const chartData = data.slice(0, 8).map(item => ({
    time: new Date(item.dt_txt).toLocaleTimeString('ua-UA', { hour: '2-digit', minute: '2-digit' }),
    temp: Math.round(item.main.temp),
    }));

  return (
    <div className="h-37.5 w-full mt-6 bg-white/5 rounded-3xl p-4 border border-white/10">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="time" hide />
          <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '15px', backdropFilter: 'blur(10px)' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area type="monotone" dataKey="temp" stroke="#fff" fillOpacity={1} fill="url(#colorTemp)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};