import { ChangeEvent, useRef, useState } from 'react';

export interface AutocompleteProps {
  data: string[];
  disabled?: boolean;
  onSelect: (item: string) => void;
}

export const Autocomplete = ({ data, disabled, onSelect }: AutocompleteProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);

    if (value.length > 1) {
      const matches = data.filter((data) => data.toLowerCase().includes(value.toLowerCase()));
      setResults(matches);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (item: string) => {
    setQuery('');
    setResults([]);
    onSelect(item);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Agrega entre 4 y 8 canciones"
        autoCapitalize='none'
        disabled={disabled}
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-2 text-purple-900 bg-purple-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      {results.length > 0 && (
        <ul className="absolute top-full left-0 z-10 w-full bg-purple-100 rounded-b-md shadow-lg max-h-64 overflow-scroll">
          {results.map(item => (
            <li
              key={item}
              className="px-4 py-2 cursor-pointer hover:bg-purple-200"
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
