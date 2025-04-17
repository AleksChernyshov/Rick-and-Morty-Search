import React from 'react';
import { Link } from 'react-router-dom';
import { useSearchStore } from '../store/searchStore';

export const SearchHistory: React.FC = () => {
  const history = useSearchStore(s => s.history);
  const clearHistory = useSearchStore(s => s.clearHistory);
  const deleteHistoryItem = useSearchStore(s => s.deleteHistoryItem);

  return (
    <div className="space-y-4 pt-4 pb-4">
      <div className="flex justify-between items-baseline">
        <h2 className="text-2xl font-press-start text-blue-accent">
          Search History
        </h2>
        <button
          onClick={clearHistory}
          className="
            bg-accent-red text-white px-3 py-1 rounded-lg font-vt323 text-xl
            shadow-[0_0_10px_rgba(255,102,102,0.7)]
            transition duration-300 ease-in-out
            hover:scale-105 hover:rotate-1 hover:bg-accent-red-dark
            hover:shadow-[0_0_20px_rgba(255,102,102,0.9)]
          "
        >
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item, idx) => (
          <Link
            key={idx}
            to={`/character/${item.character.id}`}
            className="
              group block relative bg-dark-bg overflow-hidden rounded-lg
              shadow-neon transition-transform duration-300 ease-in-out
              hover:scale-105 hover:rotate-1 border-2 border-neon-green/50
              h-64
            "
          >
            <img
              src={item.character.image}
              alt={item.character.name}
              className="w-full h-full object-cover"
            />
            <div
              className="
                absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm
                text-white-light p-4 transform translate-y-full opacity-0
                group-hover:translate-y-0 group-hover:opacity-100
                transition-all duration-500 ease-in-out
              "
            >
              <h3 className="text-lg font-bold">{item.character.name}</h3>
              <p className="text-sm">
                {item.character.species} | {item.character.status}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteHistoryItem(item.character.id);
              }}
              className="
                absolute top-2 right-2
                bg-accent-red p-1 rounded-full text-white
                hover:bg-accent-red-dark transition-colors duration-200
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 6h18v2H3zm2 3h14l-1.5 12h-11z" />
              </svg>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};