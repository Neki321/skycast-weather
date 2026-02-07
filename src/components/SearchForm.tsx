import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { fetchCitySuggestions } from '../services/weatherService';
import type { ICitySuggestion } from '../types/weather';

interface SearchFormProps {
  onSearch: (city: string) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<ICitySuggestion[]>([]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (city.trim().length >= 3) {
        const list = await fetchCitySuggestions(city);
        setSuggestions(list);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [city]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setSuggestions([]);
      setCity('');
    }
  };

  const handleSelect = (s: ICitySuggestion) => {
    onSearch(`${s.name}, ${s.country}`);
    setCity('');
    setSuggestions([]);
  };

  return (
    <div className="relative mb-8">
      <form onSubmit={handleSubmit} className="flex items-center bg-white/20 rounded-2xl px-4 py-2 focus-within:ring-2 ring-white/50 transition-all shadow-lg">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введіть назву міста..."
          className="bg-transparent border-none outline-none flex-1 placeholder:text-white/60 text-white py-1"
        />
        <button type="submit" className="hover:scale-110 transition-transform cursor-pointer outline-none">
          <Search size={22} className="text-white/80" />
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-y-auto max-h-60 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 scrollbar-hide">
          {suggestions.map((s, index) => (
            <div
              key={index}
              onClick={() => handleSelect(s)}
              className="px-4 py-3 hover:bg-white/20 cursor-pointer border-b border-white/10 last:border-none transition-colors text-sm text-white"
            >
              <span className="font-bold">{s.name}</span>, <span className="opacity-70 text-xs">{s.state || s.country}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};