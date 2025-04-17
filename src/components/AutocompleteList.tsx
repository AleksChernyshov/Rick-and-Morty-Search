import React from 'react';
import { useSearchStore } from '../store/searchStore';

interface Props {
  onSelect: (id: number) => void;
}

export const AutocompleteList: React.FC<Props> = ({ onSelect }) => {
  const items = useSearchStore(s => s.results);
  const query = useSearchStore(s => s.query);

  if (query.trim() !== '' && items.length === 0) {
    return (
      <ul className="mt-2 space-y-2">
        <li className="
          p-3 border-2 border-accent-red rounded-lg
          text-center text-accent-red font-vt323
        ">
          No results found
        </li>
      </ul>
    );
  }

  return (
    <ul className="mt-2 space-y-2">
      {items.map(char => (
        <li
          key={char.id}
          onClick={() => onSelect(char.id)}
          className="
            relative flex items-center gap-3 p-3
            border-2 border-neon-green/50 rounded-lg
            cursor-pointer overflow-hidden
            transition-transform duration-200 ease-in-out
            hover:scale-105 hover:rotate-1 hover:bg-neon-green/10 group
          "
        >
          <img
            src={char.image}
            alt={char.name}
            className="w-12 h-12 object-cover rounded-lg border-2 border-neon-green/50 flex-shrink-0"
          />
          <span className="text-white-light font-medium">{char.name}</span>
          <span className="
            pointer-events-none absolute inset-0
            bg-gradient-to-r from-transparent via-neon-green/30 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-500
          " />
        </li>
      ))}
    </ul>
  );
};
