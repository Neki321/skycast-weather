import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (city: string) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-white/20 rounded-2xl px-4 py-2 mb-8 focus-within:ring-2 ring-white/50 transition-all">
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
  );
};